import type { LumiLoggerConfig } from "@ldb/logger";
import type { config } from "mssql";
import { name, version } from "./metadata.js";
import type { SchedulerConfigs } from "./types/scheduler.js";

export const environment = "DEV" as const;
export const healthcheckPort = 5000 as const;

export const lumiLoggerConfig = {
    sentryNodeOptions: {
        dsn: "https://098a0c6ad1d74e8eb39ec7df895e59e0@sentry.lumigame.com/76",
        environment,
        initialScope: {
            tags: { service: name },
        },
        release: `${name}@${version}`,
    },
    skynexOptions: {
        conversationIds: {
            telegram: -1001911631568,
            teams: "19:11eb3bf6c3c240fd993eb8048615835c@thread.tacv2",
        },
    },
    environment,
    terminalSeverityLevel: "debug",
} as const satisfies LumiLoggerConfig;

const mongoCred = "lmn_summary:LmnSummary" as const;
const mongoSrv = "10.10.50.12:39100,10.10.50.13:39100,10.10.50.14:39100" as const;
const mongoRepl = "L1Local" as const;

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
    } as const satisfies config,
} as const;

export const schedulerConfig = {
    SYNC: [60_000, 0],
} as const satisfies SchedulerConfigs;
