import { ERROR_CODE, IResponse, STATUS_CODE } from '@sellerspot/universal-types';
import { ErrorRequestHandler } from 'express';
import { CustomError } from '../error';
import { logger } from '../utility';

export const errorHandler: ErrorRequestHandler = (err, _, res, __): Response | void => {
    if (err instanceof CustomError) {
        res.status(err.statusCode).send({ status: false, errors: err.serializeErrors() });
        return;
    }

    logger.error(`Error-${err}`);

    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send(<IResponse>{
        status: false,
        error: { code: ERROR_CODE.OPERATION_FAILURE, message: 'Operation failed' },
    });
};
