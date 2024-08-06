/* eslint-disable new-cap */
import { MongoClient, MONGOCLIENT_DEFAULT_OPTIONS } from "@ldb/mongo";
import mssql from "mssql";
import { database } from "./app-configs.js";
import type { App } from "./app.js";
import { Container } from "./container.js";

(async () => {
    const mongoDB = new MongoClient(database.mongoURI, MONGOCLIENT_DEFAULT_OPTIONS);
    const mssqlDB = await mssql.connect(database.mssqlConfig);

    const container = new Container().register().registerDatabases(mongoDB, mssqlDB);
    const app: App = container.resolve("app");
    container.resolve("healthcheckServer");
    await app.initiate();
})();
