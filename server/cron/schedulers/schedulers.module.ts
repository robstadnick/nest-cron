import { Module } from '@nestjs/common';
import { SchedulersService } from './schedulers.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CronJobSchema } from '../interfaces/cron.jobs.model';
import { CronLogSchema } from '../interfaces/cron.logs.model';

@Module({
  providers: [SchedulersService],
  imports: [
    MongooseModule.forFeature([
      { name: 'CRON_JOB_MODEL', schema: CronJobSchema },
      { name: 'CRON_LOG_MODEL', schema: CronLogSchema },
    ]),
  ],
  exports: [
    SchedulersService
  ]
})
export class SchedulersModule { }
