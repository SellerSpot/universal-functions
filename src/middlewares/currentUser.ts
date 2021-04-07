import { Request, Response, NextFunction } from 'express';
import { JWTManager } from '../services/auth';
import { ITenantJWTToken } from '@sellerspot/universal-types';
import { setTenantDb } from '@sellerspot/database-models';

declare global {
    namespace Express {
        interface Request {
            currentTenant?: ITenantJWTToken;
        }
    }
}

export const currentUser = (req: Request, _: Response, next: NextFunction): void | NextFunction => {
    if (!req.cookies || !req.headers['current-tenant']) {
        console.log(req.cookies);
        return next();
    }
    try {
        const currentUser = req.headers['current-tenant'] as string;
        const tenantIdVsToken = req.cookies;
        console.log(`${currentUser} && ${tenantIdVsToken}`);
        if (tenantIdVsToken[currentUser]) {
            const token = tenantIdVsToken[currentUser];
            const payload = JWTManager.compare(token) as ITenantJWTToken;
            req.currentTenant = payload;
            setTenantDb(req.currentTenant.id);
        }
    } catch (error) {
    } finally {
        next();
    }
};
