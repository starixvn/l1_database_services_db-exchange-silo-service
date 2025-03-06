import type { Metadata } from "@ldb/utils";

export const name = "exchange-silo-service" as const;
export const version = "0.1.4" as const;

export const metadata = { name, version } as const satisfies Metadata;
