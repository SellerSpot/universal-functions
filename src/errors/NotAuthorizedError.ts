import { ERROR_CODE, IErrorResponse, STATUS_CODE } from '@sellerspot/universal-types';
import { CustomError } from './CustomError';

export class NotAuthorizedError extends CustomError {
    statusCode = STATUS_CODE.UNAUTHORIZED;
    message: string;
    errorCode: ERROR_CODE;

    constructor(
        errorCode: ERROR_CODE = ERROR_CODE.NOT_AUTHENTICATED_USER,
        message = 'Auth required to access this resource',
    ) {
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }

    serializeErrors(): IErrorResponse {
        return { code: this.errorCode, message: this.message };
    }
}
