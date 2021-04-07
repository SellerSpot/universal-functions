import { Request, Response, NextFunction } from 'express';

import { NotAuthorizedError } from '../errors';

export const auth = (req: Request, _: Response, next: NextFunction): void => {
    if (!req.currentTenant) {
        throw new NotAuthorizedError();
    }
    next();
};
