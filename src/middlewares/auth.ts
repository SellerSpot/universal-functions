import { RequestHandler } from 'express';
import { NotAuthorizedError } from '../errors';
import { JWTManager } from '../services/auth';
import { logger } from '../utilities';
import { ITenantJWTToken } from '@sellerspot/universal-types';
import { DbManager } from '../';

export const auth: RequestHandler = (req, _, next): void => {
    if (!req.cookies || !req.headers['current-tenant']) {
        logger.error(`No cookies or current user header found.`);
        throw new NotAuthorizedError();
    }
    const currentUser = <string>req.headers['current-tenant'];
    const tenantIdVsToken = req.cookies;
    logger.info(`${tenantIdVsToken[currentUser]} token`);
    if (tenantIdVsToken[currentUser]) {
        const token = tenantIdVsToken[currentUser];
        const payload = <ITenantJWTToken>JWTManager.compare(token);
        req.currentTenant = payload;
        DbManager.INSTANCE.setTenantDb(req.currentTenant.id);
        return next();
    }
    throw new NotAuthorizedError();
};
