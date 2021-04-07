import { CustomError } from './CustomError';
import { IErrorResponse, ERROR_CODE, STATUS_CODE } from '@sellerspot/universal-types';
import { ValidationErrorItem } from 'joi';

export class RequestValidationError extends CustomError {
    statusCode = STATUS_CODE.BAD_REQUEST;
    message: string;
    errorCode = ERROR_CODE.VALIDATION_ERROR;
    errors: ValidationErrorItem[];

    constructor(errors: ValidationErrorItem[], message = 'Invalid request parameters') {
        super(message);
        this.errors = errors;
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors(): IErrorResponse {
        return {
            code: this.errorCode,
            errors: this.errors.map((err) => ({
                name: err.context.label,
                message: err.message,
            })),
        };
    }
}
