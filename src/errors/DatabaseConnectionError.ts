import { ERROR_CODE, IErrorResponse, STATUS_CODE } from '@sellerspot/universal-types';
import { CustomError } from './CustomError';

export class DatabaseConnectionError extends CustomError {
    statusCode = STATUS_CODE.INTERNAL_SERVER_ERROR;
    errorCode = ERROR_CODE.DB_FAILURE;

    constructor() {
        super('Error connecting to db');
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors(): IErrorResponse {
        return { code: this.errorCode, key: ERROR_CODE[this.errorCode] };
    }
}
