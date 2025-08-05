/** @typedef {import("@ldb/logger").LumiLoggerConfig} LumiLoggerConfig */
/** @typedef {import("@ldb/mongo").ChangeStreamNameSpace} ChangeStreamNameSpace */

import { name, version } from "./metadata.js";

export const environment = "HD-MIS-SIT";
export const healthcheckPort = 5000;

/** @type {LumiLoggerConfig} */
export const lumiLoggerConfig = {
    sentryNodeOptions: {
        dsn: "https://9e03285f9c3ff7b4b44903dd009f49dd@sentry-kl.sgamesuat.com/22",
        environment,
        initialScope: {
            tags: { service: name },
        },
        release: `${name}@${version}`,
    },
    skynexOptions: {
        conversationIds: {
            telegram: -1002034115006,
            slack: "B08GPPK88MS:T08ACMHMMFS:C090ALHP2DD",
        },
    },
    environment,
};

const mongoCred = "lmn_summary:%4c%6d%6e%53%75%6d%6d%61%72%79%40%35%31%37";
const mongoSrv = "172.16.4.111:35301";
const mongoRepl = "SP-SIT";

export const database = {
    mongoURI: `mongodb://${mongoCred}@${mongoSrv}/admin?authSource=admin&appName=${encodeURIComponent(name)}&replicaSet=${mongoRepl}`,
    mssqlConfig: {
        server: "172.16.4.111",
        port: 1433,
        database: "SabaWH",
        user: "exchange_silo",
        password: "5QjQVV7RtNSAC.Qfk1Vyl8lB.y@1.bEt",
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

/** @type {Record<string, ChangeStreamNameSpace>} */
export const namespaces = {
    exchangeConfig: { db: "hotdog_minigame", coll: "global_configs" },
    exchangeSilos: { db: "hotdog_minigame", coll: "exchange_silos" },
};
