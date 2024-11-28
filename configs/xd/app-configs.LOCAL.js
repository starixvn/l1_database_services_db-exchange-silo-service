/** @typedef {import("@ldb/logger").LumiLoggerConfig} LumiLoggerConfig */

import { name, version } from "./metadata.js";

export const environment = "XD-LOCAL-0";
export const healthcheckPort = 5000;

/** @type {LumiLoggerConfig} */
export const lumiLoggerConfig = {
    sentryNodeOptions: {
        dsn: "https://9ea52e989cbd40458728a6b26c1107b1@sentry.lumigame.com/88",
        environment,
        initialScope: {
            tags: { service: name },
        },
        release: `${name}@${version}`,
    },
    skynexOptions: {
        conversationIds: {
            telegram: -1002034115006,
            teams: "19:d7150ed870de4bef928c69ea6949c6ff@thread.tacv2",
        },
    },
    environment,
};

const mongoCred = "lmn_summary:LmnSummary";
const mongoSrv = "10.10.50.12:39300,10.10.50.13:39300,10.10.50.14:39300";
const mongoRepl = "GNLocal0";

export const database = {
    mongoURI: `mongodb://${mongoCred}@${mongoSrv}/admin?authSource=admin&appName=${encodeURIComponent(name)}&replicaSet=${mongoRepl}`,
    mssqlConfig: {
        server: "10.10.50.14",
        port: 1433,
        database: "SabaWH",
        user: "exchange_silo",
        password: "!ExchangeSilo@",
        parseJSON: true,
        pool: { min: 1, max: 5, idleTimeoutMillis: 120_000 },
        options: {
            encrypt: true,
            trustServerCertificate: true,
            appName: `${name}@${version}`,
        },
    },
};

export const schedulerConfig = {
    SYNC: [3_600_000, 60_000],
};
