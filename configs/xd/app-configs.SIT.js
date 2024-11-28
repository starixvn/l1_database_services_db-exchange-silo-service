/** @typedef {import("@ldb/logger").LumiLoggerConfig} LumiLoggerConfig */

import { name, version } from "./metadata.js";

export const environment = "XD-SIT";
export const healthcheckPort = 5000;

/** @type {LumiLoggerConfig} */
export const lumiLoggerConfig = {
    sentryNodeOptions: {
        dsn: "http://deb8a0a2ea0e4788a8d19b9aee8b2aa9@10.2.190.51:9009/297",
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
        proxy: {
            protocol: "http",
            host: "lisasqd.nebula.prod",
            port: 8801,
        },
    },
    environment,
};

const mongoCred = "lmn_summary:%4c%6d%6e%53%75%6d%6d%61%72%79%40%35%31%37";
const mongoSrv = "10.99.99.53:39430,10.99.99.54:39430,10.99.99.188:39430,10.99.99.187:39430";
const mongoRepl = "SN-SIT";

export const database = {
    mongoURI: `mongodb://${mongoCred}@${mongoSrv}/admin?authSource=admin&appName=${encodeURIComponent(name)}&replicaSet=${mongoRepl}`,
    mssqlConfig: {
        server: "10.99.99.188",
        port: 1433,
        database: "SabaWH",
        user: "exchange_silo",
        password: "?&fPzXqB@E!~V51w+II2=Eb^npLd.ecS",
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
    SYNC: [3_600_000, 2_460_000],
};
