/** @typedef {import("@ldb/logger").LumiLoggerConfig} LumiLoggerConfig */

import { name, version } from "./metadata.js";

export const environment = "XD-PROD";
export const healthcheckPort = 5000;

/** @type {LumiLoggerConfig} */
export const lumiLoggerConfig = {
    sentryNodeOptions: {
        dsn: "http://9326bb3634924b3baf140399926a6df3@10.2.189.50:9009/170",
        environment,
        initialScope: {
            tags: { service: name },
        },
        release: `${name}@${version}`,
    },
    skynexOptions: {
        conversationIds: {
            telegram: -1002096556100,
            teams: "19:1757113a88734d85be13ad84f3dcbc66@thread.tacv2",
        },
        proxy: {
            protocol: "http",
            host: "lisasqd.nebula.prod",
            port: 8801,
        },
    },
    environment,
};

const mongoCred = "lmn_summary:%25%7a%3b%26%30%4f%4f%22%4e%41%58%4d%55%21%38%51%6e%45%26%55%39%34%7e%23%62%62%3f%58%42%60%37%61";
const mongoSrv = "10.99.99.53:39410,10.99.99.54:39410,10.99.99.188:39410,10.99.99.187:39410";
const mongoRepl = "SN-Main";

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
    SYNC: [3_600_000, 60_000],
};
