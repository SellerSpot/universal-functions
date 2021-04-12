import { CustomError } from './CustomError';
import { IErrorResponse, STATUS_CODE, ERROR_CODE } from '@sellerspot/universal-types';

export class BadRequestError extends CustomError {
    statusCode = STATUS_CODE.BAD_REQUEST;
    message: string;
    errorCode: ERROR_CODE;

    constructor(errorCode: ERROR_CODE, message = 'Bad request') {
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    serializeErrors(): IErrorResponse {
        return { code: this.errorCode, message: this.message };
    }
}
