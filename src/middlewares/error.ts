import { ERROR_CODE, IResponse, STATUS_CODE } from '@sellerspot/universal-types';
import { ErrorRequestHandler, Response } from 'express';
import { CustomError } from '../errors';
import { logger } from '../utilities';

export const errorHandler: ErrorRequestHandler = (err: Error, _, res, __): Response => {
    if (err instanceof CustomError) {
        return res
            .status(err.statusCode)
            .send(<IResponse>{ status: false, error: err.serializeErrors() });
    }

    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        //Json invalid
        return res.status(STATUS_CODE.BAD_REQUEST).send({
            status: false,
            error: { code: ERROR_CODE.INVALID_JSON, message: 'Request body is invalid' },
        }); // Bad request
    }

    logger.error(`Error-${err} Trace-${err.stack}`);

    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send({
        status: false,
        error: { code: ERROR_CODE.OPERATION_FAILURE, message: 'Operation failed' },
    });
};
