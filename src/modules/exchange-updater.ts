/* eslint-disable new-cap */
import type { BaseLogger } from "@ldb/base-logger";
import type { AnyBulkWriteOperation, Collection } from "@ldb/mongo";
import mssql from "mssql";
import type { ExchangeCodes, ExchangeConfigSchema, ExchangeSilo } from "../types/exchanges.js";
import type { Scheduler, SchedulerEvents, SchedulerKey } from "../types/scheduler.js";
import { Subscriber } from "./subscriber.js";

const convertExchangeDataToBulkWrite = ({ time, code, USD, VND }: ExchangeSilo): AnyBulkWriteOperation => ({
    updateOne: {
        filter: { time, code },
        update: [{ $set: { USD: { $round: [USD, 10] }, VND: { $round: [VND, 10] } } }],
        upsert: true,
    },
});

export class ExchangeUpdater extends Subscriber<SchedulerKey, SchedulerEvents> {
    startTime: Date | null = null;

    constructor(
        private readonly exchangeConfig: Collection<ExchangeConfigSchema>,
        private readonly exchangeSourceDB: mssql.ConnectionPool,
        private readonly exchangeSilos: Collection,
        private readonly getExchangeSP: string,
        logger: BaseLogger
    ) {
        super(logger);
        this.selfBound();
    }

    private selfBound() {
        this.execute = this.execute.bind(this);
    }

    async execute() {
        if (this.startTime) {
            this.logger.logInfo({ title: `${this.className}.execute`, message: `Exchange updater has been running since ${this.startTime.toISOString()}` });
            return;
        }

        try {
            this.startTime = new Date();
            const codes = await this.getCodes();
            const exchangeData = await this.fetchExchange(codes);
            await this.updateExchange(exchangeData);
        } catch (error) {
            this.logger.logError({ title: `${this.className}.execute`, message: error });
        } finally {
            this.startTime = null;
        }
    }

    async getCodes() {
        const result = await this.exchangeConfig.findOne<{ codes: ExchangeCodes }>({ type: "exchange_codes" }, { projection: { codes: "$configs.codes" } });
        const { codes } = result ?? { codes: [] };
        return codes;
    }

    async fetchExchange(codes: ExchangeCodes): Promise<ExchangeSilo[]> {
        const request = this.exchangeSourceDB.request();

        const tvp = new mssql.Table();
        tvp.columns.add("Code", mssql.VarChar(12));
        for (const code of codes) {
            tvp.rows.add(code);
        }
        request.input("Codes", tvp);

        const result = await request.execute<ExchangeSilo>(this.getExchangeSP);
        return result.recordset;
    }

    async updateExchange(data: ExchangeSilo[]) {
        if (data.length === 0) {
            return;
        }

        const bulkPipe = data.map(convertExchangeDataToBulkWrite);
        const { matchedCount, modifiedCount, upsertedCount } = await this.exchangeSilos.bulkWrite(bulkPipe, { ordered: false });
        this.logger.logDebug({ title: `${this.className}.updateExchange`, message: `#=${matchedCount}  I+${upsertedCount}  M=${modifiedCount}` });
    }

    subscribe(publisher: Scheduler) {
        return super.subscribe(publisher, this.execute, "SYNC");
    }

    unsubscribe(publisher: Scheduler) {
        return super.unsubscribe(publisher, this.execute, "SYNC");
    }
}
