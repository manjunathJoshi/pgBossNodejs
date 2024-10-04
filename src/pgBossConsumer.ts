import {PgBossService} from "./pgBossService";

interface JobHandler {
  (message: any): Promise<void>;
}

interface QueueConfig {
  name: string;
  handler: JobHandler;
}

interface BullQueueConfigs {
  [key: string]: QueueConfig;
}

const bullQueueConfigs: BullQueueConfigs = {
  'every-minute-job': {
    name: 'every-minute-job',
    handler: handleEveryMinuteScheduler
  },
  'one-time-handler': {
    name: 'one-time-handler',
    handler: oneTimeHandler
  }
};

export async function handleEveryMinuteScheduler(message: any): Promise<void> {
  console.log("every minute scheduler handler" + JSON.stringify(message));
}

export async function oneTimeHandler(message: any): Promise<void> {
  console.log("one time handler" + message);
}

export async function intializeConsumer(): Promise<void> {
  const pgBoss = PgBossService.getInstance()
  await pgBoss.initConsumers(bullQueueConfigs);
}