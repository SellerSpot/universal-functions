import { IUserJwtTokenPayload } from '@sellerspot/universal-types';
import { RequestHandler } from 'express';
import { NotAuthorizedError } from '../errors';
import { JWTManager } from '../services/auth';
import { logger } from '../utilities';

export const auth: RequestHandler = (req, _, next): void => {
    try {
        const hasCookies = !!req.cookies;
        const hasOriginHeader = !!req.headers.origin;
        const hasQueryParam = !!req.query.domain; // allow query acces from accounts app only
        if (!hasCookies || !(hasOriginHeader || hasQueryParam)) {
            logger.error(`No cookies or current user header or query not found found.`);
            throw new NotAuthorizedError();
        }
        let domainName = '';
        if (hasQueryParam) {
            domainName = <string>req.query.domain;
        } else {
            const currentUserURLObj = new URL(req.headers.origin);
            domainName = currentUserURLObj?.hostname;
        }
        logger.info(`${domainName} is set as hostname`);
        const tenantIdVsToken = req.cookies;
        if (tenantIdVsToken[domainName]) {
            const token = tenantIdVsToken[domainName];
            const payload = <IUserJwtTokenPayload>JWTManager.verify(token);
            req.currentTenant = { ...payload, domainName };
            return next();
        }
        throw new NotAuthorizedError();
    } catch (error) {
        //Catching and throwing because to get below log
        logger.error(`Error in auth middleware ${error}`);
        throw new NotAuthorizedError();
    }
};
