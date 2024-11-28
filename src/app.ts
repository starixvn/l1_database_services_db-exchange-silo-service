import { BaseApp } from "@ldb/base-app";
import type { BaseLogger } from "@ldb/logger";
import type { Scheduler } from "@ldb/scheduler";
import type { Metadata } from "@ldb/utils";
import type { SchedulerKeys } from "./types/scheduler.js";
import type { ExchangeUpdater } from "./updater/exchange-updater.js";

export class App extends BaseApp {
    constructor(
        private readonly scheduler: Scheduler<SchedulerKeys>,
        private readonly exchangeUpdater: ExchangeUpdater,
        metadata: Metadata,
        logger: BaseLogger,
    ) {
        super(metadata, logger);
    }

    initiate() {
        this.exchangeUpdater.subscribe(this.scheduler);
        this.scheduler.emit("SYNC");
        super.initiate();
    }

    terminate() {
        this.exchangeUpdater.unsubscribe(this.scheduler);
        super.terminate();
    }
}
