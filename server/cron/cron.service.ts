import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ModelCronJobs } from './interfaces/cron.jobs.model';
import { ModelCronLogs } from './interfaces/cron.logs.model';

@Injectable()
export class CronService {

    constructor(
        @InjectModel('CRON_JOB_MODEL') private readonly cronJobModel: Model<ModelCronJobs>,
        @InjectModel('CRON_LOG_MODEL') private readonly cronLogModel: Model<ModelCronLogs>,
    ) {

    }

    public async findAll(): Promise<Array<ModelCronJobs>> {
        return await this.cronJobModel.find();
    }

    public async findOne(options: any): Promise<ModelCronJobs | null> {
        return await this.cronJobModel.findOne(options);
    }

    public async findById(id: string): Promise<ModelCronJobs | null> {
        return await this.cronJobModel.findById(id);
    }

    public async create(job: ModelCronJobs): Promise<ModelCronJobs> {
        const newJob = new this.cronJobModel(job);
        // console.log(newJob);
        return await newJob.save();
    }

    public async update(id: string, job: ModelCronJobs): Promise<ModelCronJobs | null> {
        try {
            const Job = await this.cronJobModel.findById(id);
            Job.set(job);
            Job.save();
            return Promise.resolve(Job);
        } catch (error) {
            throw new NotImplementedException(error);
        }
    }

    public async delete(id: string) {
        return await this.cronJobModel.findByIdAndDelete(id);
    }

    public async findAllLogs(): Promise<Array<ModelCronLogs>> {
        return await this.cronLogModel.find();
    }

    public async findOneLogs(options: any): Promise<ModelCronLogs | null> {
        return await this.cronLogModel.findOne(options);
    }

    public async findByIdLogs(id: string): Promise<ModelCronLogs | null> {
        return await this.cronLogModel.findById(id);
    }

    public async createLogs(job: ModelCronLogs): Promise<ModelCronLogs> {
        const newJob = new this.cronLogModel(job);
        // console.log(newJob);
        return await newJob.save();
    }

    public async updateLogs(id: string, job: ModelCronLogs): Promise<ModelCronLogs | null> {
        try {
            const Job = await this.cronLogModel.findById(id);
            Job.set(job);
            Job.save();
            return Promise.resolve(Job);
        } catch (error) {
            throw new NotImplementedException(error);
        }
    }

    public async deleteLogs(id: string) {
        return await this.cronLogModel.findByIdAndDelete(id);
    }
}
