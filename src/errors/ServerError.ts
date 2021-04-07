import { CustomError } from './CustomError';
import { IErrorResponse, STATUS_CODE, ERROR_CODE } from '@sellerspot/universal-types';

export class ServerError extends CustomError {
    statusCode = STATUS_CODE.INTERNAL_SERVER_ERROR;
    message: string;
    errorCode: ERROR_CODE;

    constructor(errorCode: ERROR_CODE, message = 'Something went wrong') {
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        Object.setPrototypeOf(this, ServerError.prototype);
    }

    serializeErrors(): IErrorResponse {
        return { code: this.errorCode, message: this.message };
    }
}
