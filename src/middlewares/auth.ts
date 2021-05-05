import { ITenantJWTToken } from '@sellerspot/universal-types';
import { RequestHandler } from 'express';
import { NotAuthorizedError } from '../errors';
import { JWTManager } from '../services/auth';
import { logger } from '../utilities';

export const auth: RequestHandler = (req, _, next): void => {
    try {
        if (!req.cookies || !req.headers.origin) {
            logger.error(`No cookies or current user header found.`);
            throw new NotAuthorizedError();
        }
        const currentUserURLObj = new URL(req.headers.origin);
        const currentUserHostName = currentUserURLObj?.hostname;
        logger.info(`${currentUserHostName} is set as hostname`);
        const tenantIdVsToken = req.cookies;
        logger.debug(`${tenantIdVsToken[currentUserHostName]} is the token`);
        if (tenantIdVsToken[currentUserHostName]) {
            const token = tenantIdVsToken[currentUserHostName];
            const payload = <ITenantJWTToken>JWTManager.compare(token);
            req.currentTenant = payload;
            return next();
        }
        throw new NotAuthorizedError();
    } catch (error) {
        //Catching and throwing because to get below log
        logger.error(`Error in auth middleware ${error}`);
        throw new NotAuthorizedError();
    }
};
