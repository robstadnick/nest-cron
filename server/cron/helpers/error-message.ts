import { HttpStatus } from '@nestjs/common';
import { IErrorMessages } from '../../errors/interfaces/error-message.interface';

export const errorMessagesConfig: { [messageCode: string]: IErrorMessages } = {
    'cronjob:create:missingInformation': {
        type: 'BadRequest',
        httpStatus: HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to create a new user with missing information.',
        userMessage: 'Unable to create a new user with missing information.'
    },
};
