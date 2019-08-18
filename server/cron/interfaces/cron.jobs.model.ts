import { Schema, Document } from 'mongoose';

export const CronJobSchema = new Schema({
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    frequency: { type: String, required: true }, // Monthly, Weekly
    table: { type: String, required: true }, // Users
    type: { type: String, required: true }, // Like a category, "Auth"
    is_active: Boolean,
    transactions: [ // Keeps track of users who modify the cron job (Turning off/on, adjusting type)
        {
            user_id: String,
            time_stamp: Date,
            type: String,
            description: String
        }
    ]
});

export interface ModelCronJobs extends Document {
    id: string
    created_at: Date
    updated_at: Date
    frequency: string
    table: string
    type: string
    is_active: boolean
    transactions: CronJobTransactions[]
}

interface CronJobTransactions {
    user_id: string,
    time_stamp: Date,
    type: string,
    description: string
}
