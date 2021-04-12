import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/CustomError';
import { STATUS_CODE, ERROR_CODE, IResponse } from '@sellerspot/universal-types';

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
): Response | void => {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).send({ status: false, errors: err.serializeErrors() });
    }

    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send(<IResponse>{
        status: false,
        error: { code: ERROR_CODE.OPERATION_FAILURE, message: 'Operation failed' },
    });
};
