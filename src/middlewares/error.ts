import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/CustomError';

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
): Response | void => {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).send({ status: false, errors: err.serializeErrors() });
    }

    res.status(400).send({
        errors: [{ message: 'Something went wrong' }],
    });
};
