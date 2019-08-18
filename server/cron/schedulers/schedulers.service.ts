import { Injectable } from '@nestjs/common';
import { scheduleJob, RecurrenceRule } from 'node-schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ModelCronJobs } from '../interfaces/cron.jobs.model';
import { ModelCronLogs } from '../interfaces/cron.logs.model';
// Import jobs as services here, add to constructer to inject

@Injectable()
export class SchedulersService {
    constructor(
        @InjectModel('CRON_JOB_MODEL') private readonly cronJobModel: Model<ModelCronJobs>,
        @InjectModel('CRON_LOG_MODEL') private readonly cronLogModel: Model<ModelCronLogs>,

    ) {
        console.log('Cron Jobs Loaded');
        const rule = new RecurrenceRule();
        rule.dayOfWeek = 6; // [0, new schedule.Range(5, 6)];
        rule.hour = 7;
        rule.minute = 30;
        const monthly = scheduleJob(rule, async () => {
            const jobs = await this.cronJobModel.find({ frequency: 'monthly' });
            for (const job of jobs) {
                if (job.is_active) {
                    // Find the function associated with this job to run it.
                    // Function should create a new log
                }
            }
        });

        const dailyRule = new RecurrenceRule();
        dailyRule.hour = 3;
        dailyRule.minute = 39;
        const daily = scheduleJob(dailyRule, async () => {
            const jobs = await this.cronJobModel.find({ frequency: 'daily' });
            for (const job of jobs) {
                if (job.is_active) {
                    // Find the function associated with this job to run it.
                    // Function should create a new log
                }
            }
        });

    }
}
