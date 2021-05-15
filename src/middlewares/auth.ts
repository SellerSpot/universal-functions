import { Request, RequestHandler } from 'express';
import {
    ICheckDomainAvailablityRequestQuery,
    IUserJwtTokenPayload,
} from '@sellerspot/universal-types';

import { NotAuthorizedError } from '../errors';
import { JWTManager } from '../services/auth';
import { logger } from '../utilities';
import { CONFIG } from '../configs/config';

export const auth: RequestHandler = (req, _, next): void => {
    try {
        const hasCookies = !!req.cookies;
        const domainName = getDomainFromOriginOrQuery(req, true);
        if (![!!hasCookies, !!domainName].every(Boolean)) {
            logger.error(`No cookies or current user header or query not found found.`);
            throw new NotAuthorizedError();
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

export const getDomainFromOriginOrQuery = (req: Request, withHost = false): string => {
    let domain = '';
    // check if domain is available from query
    const domainDetails = <ICheckDomainAvailablityRequestQuery>(<unknown>req.query);
    if (domainDetails?.domain) {
        domain = domainDetails?.domain;
    } else {
        // check if domain is available origin
        const reqOrigin = new URL(req.headers?.origin);
        domain = reqOrigin.hostname;
    }
    // check is custom domain
    return getSanitizedDomainName(domain, withHost);
};

const getSanitizedDomainName = (domain: string, withHost = false): string => {
    let sanitizedDomain = domain;
    const aggregatedDomain = domain.split('.');
    const isCustomDomain = !CONFIG.DOMAIN.split('.').every((item) =>
        aggregatedDomain.includes(item),
    );
    if (!isCustomDomain && !withHost) {
        sanitizedDomain = aggregatedDomain[1]; // in the position 1 we could get the actual subdomain name, index 0 will have app prefix
    }
    return sanitizedDomain;
};
