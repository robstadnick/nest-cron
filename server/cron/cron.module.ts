import { Module } from '@nestjs/common';
import { CronController } from './cron.controller';
import { CronService } from './cron.service';
import { SchedulersModule } from './schedulers/schedulers.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CronJobSchema } from './interfaces/cron.jobs.model';
import { CronLogSchema } from './interfaces/cron.logs.model';

@Module({
  controllers: [CronController],
  providers: [CronService],
  imports: [
    SchedulersModule,
    MongooseModule.forFeature([
      { name: 'CRON_JOB_MODEL', schema: CronJobSchema },
      { name: 'CRON_LOG_MODEL', schema: CronLogSchema },
    ]),
  ],
})
export class CronModule { }
