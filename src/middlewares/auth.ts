import { RequestHandler } from 'express';
import { NotAuthorizedError } from '../errors';
import { JWTManager } from '../services/auth';
import { logger } from '../utilities';
import { ITenantJWTToken } from '@sellerspot/universal-types';

export const auth: RequestHandler = (req, _, next): void => {
    if (!req.cookies || !req.headers['current-tenant']) {
        logger.error(`No cookies or current user header found.`);
        throw new NotAuthorizedError();
    }
    const currentUser = <string>req.headers['current-tenant'];
    const tenantIdVsToken = req.cookies;
    logger.debug(`${tenantIdVsToken[currentUser]} token is available`);
    if (tenantIdVsToken[currentUser]) {
        const token = tenantIdVsToken[currentUser];
        const payload = <ITenantJWTToken>JWTManager.compare(token);
        req.currentTenant = payload;
        return next();
    }
    throw new NotAuthorizedError();
};
