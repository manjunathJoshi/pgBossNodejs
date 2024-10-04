import dotenv from 'dotenv';
import PgBoss from 'pg-boss';


dotenv.config();

export class PgBossService {
  private boss: PgBoss;
  private static instance: PgBossService;


  constructor() {
    this.boss = new PgBoss(process.env.DATABASE_URL || '');
  }

  public static getInstance(): PgBossService {
    if (!PgBossService.instance) {
      PgBossService.instance = new PgBossService();
    }
    return PgBossService.instance;
}

  public async initiatePgBoss(): Promise<void> {
    try {
      await this.boss.start();
    } catch (error) {
      console.log("error initializing PgBoss:", error);
    }
  }

  public async createScheduler(scheduleName: string, cron: string, message: any): Promise<void> {
    await this.boss.schedule(scheduleName, cron, message);
  }

  public async publishOneTime(name: string, message: any, startAfter: number, retryLimit: number): Promise<void> {
    const config: PublishConfig = {
      name: name,
      data: message,
      options: {
        startAfter: startAfter,
        retryLimit: retryLimit,
      }
    };
    await this.boss.send(config);
  }

  public async initConsumers(configs: ConsumerConfigs): Promise<void> {
    const keys = Object.keys(configs);
    for (const key of keys) {
      const config = configs[key];
      try {
        await this.subscribe(config.name, config.handler);
      } catch (error) {
       console.log(error);
      }
    }
  }

  private async subscribe(queueName: string, handlerFunc: (job: any) => Promise<void>): Promise<void> {
    await this.boss.work(queueName, async (job) => {
      await handlerFunc(job);
    });
  }
}

interface PublishConfig {
  name: string;
  data: any;
  options: {
    startAfter: number;
    retryLimit: number;
  };
}

interface ConsumerConfig {
  name: string;
  handler: (job: any) => Promise<void>;
}

interface ConsumerConfigs {
  [key: string]: ConsumerConfig;
}