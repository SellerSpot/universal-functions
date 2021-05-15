import { ERROR_CODE, IResponse, STATUS_CODE } from '@sellerspot/universal-types';
import { ErrorRequestHandler } from 'express';
import { CustomError } from '../errors';
import { logger } from '../utilities';

export const errorHandler: ErrorRequestHandler = (err: Error, _, res, __): Response | void => {
    if (err instanceof CustomError) {
        res.status(err.statusCode).send(<IResponse>{ status: false, error: err.serializeErrors() });
        return;
    }

    logger.error(`Error-${err} Trace-${err.stack}`);

    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send(<IResponse>{
        status: false,
        error: { code: ERROR_CODE.OPERATION_FAILURE, message: 'Operation failed' },
    });
};
