/** @typedef {import("@ldb/logger").LumiLoggerConfig} LumiLoggerConfig */
/** @typedef {import("@ldb/mongo").ChangeStreamNameSpace} ChangeStreamNameSpace */

import { name, version } from "./metadata.js";

export const environment = "SG-KLPROD";
export const healthcheckPort = 5000;

/** @type {LumiLoggerConfig} */
export const lumiLoggerConfig = {
    sentryNodeOptions: {
        dsn: "http://a44301722794b9e2d74cb4efc1655964@sentrypro-sc.ops-klprod.gamora.prod/19",
        environment,
        initialScope: {
            tags: { service: name },
        },
        release: `${name}@${version}`,
    },
    skynexOptions: {
        conversationIds: {
            telegram: -1001893615808,
            slack: "B08GPPK88MS:T08ACMHMMFS:C090GANNXP1",
        },
        proxy: {
            protocol: "http",
            host: "iusqd.gamora.prod",
            port: 8801,
        },
    },
    environment,
};

const mongoCred = "lmn_summary:%67%79%69%2b%5d%32%7c%73%3e%48%31%76%47%4c%31%53%2b%4e%4b%72%6b%6c%4d%7b%61%42%2a%3e%5d%7a%26%70";
const mongoSrv = "10.146.34.26:39110,10.146.34.27:39110,10.146.34.30:39110,10.146.34.28:39110";
const mongoRepl = "SabaMain";

export const database = {
    mongoURI: `mongodb://${mongoCred}@${mongoSrv}/admin?authSource=admin&appName=${encodeURIComponent(name)}&replicaSet=${mongoRepl}`,
    mssqlConfig: {
        server: "10.146.34.28",
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

/** @type {Record<string, ChangeStreamNameSpace>} */
export const namespaces = {
    exchangeConfig: { db: "minigame", coll: "global_configs" },
    exchangeSilos: { db: "minigame", coll: "exchange_silos" },
};
