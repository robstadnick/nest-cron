import {Schema, Document} from 'mongoose';

export const CronLogSchema = new Schema({
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    cron_job_id: { type: String, required: true }, // Related to CronJob
    frequency: { type: String, required: true }, // Monthly, Weekly
    frequency_of: { type: String, required: true }, // July, Week 36
    successful: Boolean, // was it successful
    error: String, // if error log the message
});

export interface ModelCronLogs extends Document {
    id: string
    created_at: Date
    updated_at: Date
    cron_job_id: string
    frequency: string
    frequency_of: string
    successful: boolean
    error: string
}
