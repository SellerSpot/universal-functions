import { Request, RequestHandler } from 'express';
import {
    ICheckDomainAvailablityRequestQuery,
    IUserJwtTokenPayload,
} from '@sellerspot/universal-types';
import { NotAuthorizedError } from '../errors';
import { JWTManager } from '../services/auth';
import { logger } from '../utilities';
import { CONFIG } from '../configs/config';
import { CLSService } from '../services';

export const auth: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const hasCookies = !!req.cookies;
        const hasAuthHeader = !!req.headers.authorization;
        const domainName = !hasAuthHeader ? getDomainFromOriginOrQuery(req, true) : null;
        if (!(hasCookies && domainName) && !hasAuthHeader) {
            logger.error(`No cookies or current user header or query not found found.`);
            throw new NotAuthorizedError();
        }
        let token;
        const tenantIdVsToken = req.cookies;
        if (hasCookies && tenantIdVsToken[domainName]) {
            logger.info(`${domainName} is set as hostname`);
            token = tenantIdVsToken[domainName];
        } else if (hasAuthHeader) {
            token = checkAndGetAuthTokenFromHeaders(req);
        }
        if (!token) {
            throw new NotAuthorizedError();
        }
        const payload = <IUserJwtTokenPayload>JWTManager.verify(token);
        req.currentUser = { ...payload };
        await CLSService.bindEmitter(req, res);
        await CLSService.setData(payload);
        next();
    } catch (error) {
        //Catching and throwing because to get below log
        logger.error(`Error in auth middleware ${error}`);
        throw new NotAuthorizedError();
    }
};

const checkAndGetAuthTokenFromHeaders = (req: Request): string | null => {
    const authHeader = <string>req.headers.authorization;
    const authArr = authHeader.split(' ');
    if (authArr.length === 2) {
        const scheme = authArr[0];
        if (/^Bearer$/i.test(scheme)) {
            return authArr[1];
        }
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
    const isCustomDomain = !CONFIG.DOMAIN()
        .split('.')
        .every((item) => aggregatedDomain.includes(item));
    if (!isCustomDomain && !withHost) {
        sanitizedDomain = aggregatedDomain[1]; // in the position 1 we could get the actual subdomain name, index 0 will have app prefix
    }
    return sanitizedDomain;
};
