import { Logger } from "@ldb/logger";
import type { ChangeStreamNameSpace, MongoClient } from "@ldb/mongo";
import { Scheduler } from "@ldb/scheduler";
import { SentryLogger } from "@ldb/sentry-logger";
import { SkynexLogger } from "@ldb/skynex-logger";
import { TerminalLogger } from "@ldb/terminal-logger";
import { asClass, asValue, createContainer, InjectionMode, type AwilixContainer, type ResolveOptions } from "awilix";
import mssql from "mssql";
import {
    environment,
    healthcheckPort,
    schedulerConfig,
    sentryNodeOptions,
    sentryOptions,
    sentrySeverityLevel,
    skynexOptions,
    skynexSeverityLevel,
    terminalSeverityLevel,
} from "./app-configs.js";
import { App } from "./app.js";
import { HealthcheckServer } from "./healthcheck/server.js";
import { ExchangeUpdater } from "./modules/exchange-updater.js";
import { namespaces, storedProcedures } from "./namespaces.js";

const namespaceToCollection = (mongoClient: MongoClient, { db, coll }: ChangeStreamNameSpace) => mongoClient.db(db).collection(coll);

export class Container {
    private readonly container: AwilixContainer;

    constructor() {
        this.container = createContainer({ injectionMode: InjectionMode.CLASSIC });
    }

    register() {
        this.registerLoggers().registerScheduler().registerClasses().registerHealthcheck();
        return this;
    }

    private registerLoggers() {
        this.container.register({
            terminalLogger: asClass(TerminalLogger).singleton(),
            terminalSeverityLevel: asValue(terminalSeverityLevel),
        });
        this.container.register({
            skynexLogger: asClass(SkynexLogger).singleton(),
            skynexOptions: asValue(skynexOptions),
            skynexSeverityLevel: asValue(skynexSeverityLevel),
        });
        this.container.register({
            sentryLogger: asClass(SentryLogger).singleton(),
            sentryNodeOptions: asValue(sentryNodeOptions),
            sentryOptions: asValue(sentryOptions),
            sentrySeverityLevel: asValue(sentrySeverityLevel),
        });
        this.container.register({
            logger: asClass(Logger).singleton(),
            otherLoggers: asValue(null),
            environment: asValue(environment),
        });
        return this;
    }

    private registerScheduler() {
        this.container.register({
            scheduler: asClass(Scheduler).singleton(),
            schedulerConfig: asValue(schedulerConfig),
        });
        return this;
    }

    private registerClasses() {
        this.container.register({
            app: asClass(App).singleton(),
            exchangeUpdater: asClass(ExchangeUpdater).singleton(),
        });
        return this;
    }

    private registerHealthcheck() {
        this.container.register({
            healthcheckServer: asClass(HealthcheckServer).singleton(),
            healthcheckPort: asValue(healthcheckPort),
        });
        return this;
    }

    registerDatabases(mongo: MongoClient, mssql: mssql.ConnectionPool) {
        const { exchangeConfig, exchangeSilos } = namespaces;
        const { getExchangeSP } = storedProcedures;

        this.container.register({
            exchangeConfig: asValue(namespaceToCollection(mongo, exchangeConfig)),
            exchangeSilos: asValue(namespaceToCollection(mongo, exchangeSilos)),
        });

        this.container.register({
            exchangeSourceDB: asValue(mssql),
            getExchangeSP: asValue(getExchangeSP),
        });

        return this;
    }

    resolve<N extends string>(name: N, resolveOptions?: ResolveOptions) {
        return this.container.resolve(name, resolveOptions);
    }
}
