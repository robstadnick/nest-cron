import { HttpStatus } from '@nestjs/common';
import { IErrorMessages } from '../interfaces/error-message.interface';
import { errorMessagesCron } from '../../cron/helpers/cron.error-message';
import { errorMessagesUsers } from '../../modules/users/helpers/user-error-message';
const errorMessagesConfig = [
    errorMessagesCron, errorMessagesUsers
] as { [messageCode: string]: IErrorMessages }[];

export { errorMessagesConfig };
