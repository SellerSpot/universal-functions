import { IUserJwtTokenPayload } from '@sellerspot/universal-types';
import { RequestHandler } from 'express';
import { NotAuthorizedError } from '../errors';
import { JWTManager } from '../services/auth';
import { logger } from '../utilities';

export const auth: RequestHandler = (req, _, next): void => {
    try {
        const hasCookies = !!req.cookies;
        const hasOriginHeader = !!req.headers.origin;
        const hasQueryParam = !!req.query.domain; // allow query access from accounts app only
        const hasAuthHeader = !!req.headers.authorization;
        if (!hasCookies || !(hasOriginHeader || hasQueryParam || hasAuthHeader)) {
            logger.error(`No cookies or current user header or query not found found.`);
            throw new NotAuthorizedError();
        }
        let domainName = '';
        let token = '';
        if (hasQueryParam) {
            domainName = <string>req.query.domain;
        } else if (hasOriginHeader) {
            const currentUserURLObj = new URL(req.headers.origin);
            domainName = currentUserURLObj?.hostname;
        }
        if (domainName) {
            logger.info(`${domainName} is set as hostname`);
            const tenantIdVsToken = req.cookies;
            if (tenantIdVsToken[domainName]) {
                token = tenantIdVsToken[domainName];
            }
        }
        if (hasAuthHeader) {
            const authHeader = <string>req.headers.authorization;
            const authArr = authHeader.split(' ');
            if (authArr.length === 2) {
                const scheme = authArr[0];
                if (/^Bearer$/i.test(scheme)) {
                    token = authArr[1];
                }
            }
        }
        if (token) {
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
