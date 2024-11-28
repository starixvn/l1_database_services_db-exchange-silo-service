import type { SchedulerEventDescription, TimerConfig } from "@ldb/scheduler";

export type SchedulerKeys = "SYNC";
export type SchedulerConfigs = Record<SchedulerKeys, TimerConfig>;
export type SchedulerEvents = SchedulerEventDescription<SchedulerConfigs>;
