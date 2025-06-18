import { asClass, asValue, BaseContainer } from "@ldb/base-container";
import type { ChangeStreamNameSpace, MongoClient } from "@ldb/mongo";
import mssql from "mssql";
import { healthcheckPort, lumiLoggerConfig, namespaces, schedulerConfig } from "./app-configs.js";
import { App } from "./app.js";
import { metadata } from "./metadata.js";
import { storedProcedures } from "./namespaces.js";
import { ExchangeUpdater } from "./updater/exchange-updater.js";

const namespaceToCollection = (mongoClient: MongoClient, { db, coll }: ChangeStreamNameSpace) => mongoClient.db(db).collection(coll);

export class Container extends BaseContainer {
    constructor() {
        super();
    }

    register() {
        this.registerLogger(lumiLoggerConfig).registerHealthcheck(metadata, healthcheckPort).registerScheduler(schedulerConfig).registerClasses();
        return this;
    }

    private registerClasses() {
        this.container.register({
            app: asClass(App).singleton(),
            exchangeUpdater: asClass(ExchangeUpdater).singleton(),
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
}
