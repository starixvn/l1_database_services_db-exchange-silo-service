/** @typedef {import("@ldb/logger").LumiLoggerConfig} LumiLoggerConfig */
/** @typedef {import("@ldb/mongo").ChangeStreamNameSpace} ChangeStreamNameSpace */

import { name, version } from "./metadata.js";

export const environment = "VG-KL-UAT";
export const healthcheckPort = 5000;

/** @type {LumiLoggerConfig} */
export const lumiLoggerConfig = {
    sentryNodeOptions: {
        dsn: "http://6dedea44b8f8e60b6519ff864484357a@sentrysc.ops-kluat.gamora.prod/20",
        environment,
        initialScope: {
            tags: { service: name },
        },
        release: `${name}@${version}`,
    },
    skynexOptions: {
        conversationIds: {
            telegram: -1001604444158,
            slack: "B08GPPK88MS:T08ACMHMMFS:C090ALHP2DD",
        },
        proxy: {
            protocol: "http",
            host: "iusqd.gamora.prod",
            port: 8801,
        },
    },
    environment,
};

const mongoCred = "lmn_summary:%4c%6d%6e%53%75%6d%6d%61%72%79%40%32%32%30%32%37";
const mongoSrv = "10.146.34.28:39220";
const mongoRepl = "SabaL2UAT";

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
    SYNC: [3_600_000, 1_260_000],
};

/** @type {Record<string, ChangeStreamNameSpace>} */
export const namespaces = {
    exchangeConfig: { db: "minigame", coll: "global_configs" },
    exchangeSilos: { db: "minigame", coll: "exchange_silos" },
};
