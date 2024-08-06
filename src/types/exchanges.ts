export type Code = string;

export type ExchangeCodes = Code[];

export type ExchangeConfigSchema = {
    type: "exchange_codes";
    configs: {
        codes: Code[];
    };
};

export type ExchangeSilo = {
    time: Date;
    code: Code;
    USD: number;
    VND: number;
};
