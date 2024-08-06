import type { ChangeStreamNameSpace } from "@ldb/mongo";

export const namespaces = {
    exchangeConfig: { db: "minigame", coll: "global_configs" },
    exchangeSilos: { db: "minigame", coll: "exchange_silos" },
} as const satisfies Record<string, ChangeStreamNameSpace>;

export const storedProcedures = {
    getExchangeSP: "dbo.GetExchangeOANDA",
} as const;
