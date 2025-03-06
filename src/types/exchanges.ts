import type { ObjectId } from "@ldb/mongo";

export type Code = string;

export type ExchangeCodes = Code[];

export type ExchangeConfigSchema = {
    type: "exchange_codes";
    configs: {
        codes: Code[];
    };
};

export type ExchangeSilo = {
    _id: ObjectId;
    time: Date;
    code: Code;
    USD: number;
    VND: number;
};
