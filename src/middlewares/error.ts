import { ErrorRequestHandler } from 'express';
import { CustomError } from '../errors/CustomError';
import { STATUS_CODE, ERROR_CODE, IResponse } from '@sellerspot/universal-types';

export const errorHandler: ErrorRequestHandler = (err, _, res, __): Response | void => {
    if (err instanceof CustomError) {
        res.status(err.statusCode).send({ status: false, errors: err.serializeErrors() });
        return;
    }

    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send(<IResponse>{
        status: false,
        error: { code: ERROR_CODE.OPERATION_FAILURE, message: 'Operation failed' },
    });
};
