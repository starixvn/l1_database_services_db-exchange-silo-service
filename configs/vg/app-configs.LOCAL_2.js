/** @typedef {import("@ldb/base-logger").SeverityLevel} SeverityLevel */
/** @typedef {import("@ldb/sentry-logger").NodeOptions} NodeOptions */
/** @typedef {import("@ldb/sentry-logger").SentryOptions} SentryOptions */
/** @typedef {import("@ldb/skynex-logger").SkynexOptions} SkynexOptions */

import { name, version } from "./metadata.js";

export const environment = "VG-LOCAL-2";
export const healthcheckPort = 5000;

/** @type {SeverityLevel} */
export const sentrySeverityLevel = "warning";
/** @type {NodeOptions} */
export const sentryNodeOptions = {
    dsn: "https://be2c83ae1b01424ab32f27411f22f8c5@sentry.lumigame.com/77",
    environment,
    initialScope: {
        tags: { service: name },
    },
    release: `${name}@${version}`,
};
/** @type {SentryOptions} */
export const sentryOptions = {};

/** @type {SeverityLevel} */
export const skynexSeverityLevel = "warning";
/** @type {SkynexOptions} */
export const skynexOptions = {
    conversationIds: {
        telegram: -1001604444158,
        teams: "19:8d4e742134134c3893e78891257d6c3c@thread.tacv2",
    },
};

/** @type {SeverityLevel} */
export const terminalSeverityLevel = "log";

const mongoCred = "lmn_summary:LmnSummary";
const mongoSrv = "10.10.50.12:39202,10.10.50.13:39202,10.10.50.14:39202";
const mongoRepl = "L2ppLocal";

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

export const eventConfigs = {
    SYNC: [3_600_000, 1_200_000],
};
