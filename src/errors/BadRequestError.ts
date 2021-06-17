import { ERROR_CODE, IErrorResponse, STATUS_CODE } from '@sellerspot/universal-types';
import { CustomError } from './CustomError';

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
        return {
            code: this.errorCode,
            key: ERROR_CODE[this.errorCode],
            message: this.message,
        };
    }
}
