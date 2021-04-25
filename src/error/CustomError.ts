import { IErrorResponse, ERROR_CODE } from '@sellerspot/universal-types';

export abstract class CustomError extends Error {
    abstract statusCode: number;
    abstract errorCode: ERROR_CODE;

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, CustomError.prototype);
    }

    abstract serializeErrors(): IErrorResponse;
}
