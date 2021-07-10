import { createNamespace, getNamespace, Namespace } from 'cls-hooked';
import { NextFunction, Request, Response, RequestHandler } from 'express';
import { IUserJwtTokenPayload } from '@sellerspot/universal-types';

import { CONFIG } from '../configs/config';

export default class CLSService {
    static getNamespace(namespace: string): Namespace | undefined {
        return getNamespace(namespace);
    }

    static createNamespace(namespace: string): Namespace | undefined {
        return createNamespace(namespace);
    }

    static clearScope: RequestHandler = (_, __, next): void => {
        const ns = CLSService.getNamespace(CONFIG.APP_NAME());
        if (ns && ns.active) {
            /**
             * Exits from current Context so all values set in Context will be removed
             * Note -> if any setTimeOut or similar timeout funtions is pushed to event loop with context,
             * it won't be available at time of execution
             **/
            ns.exit(ns.active);
        }
        next();
    };

    static setScope = (
        currentScope: IUserJwtTokenPayload,
        req: Request,
        res: Response,
        next: NextFunction,
    ): void => {
        let ns = CLSService.getNamespace(CONFIG.APP_NAME());
        if (!ns) ns = CLSService.createNamespace(CONFIG.APP_NAME());
        ns.run(() => {
            const { tenantId, userId } = currentScope;
            /**
             * reason for binding emitter means Requst and Response object is extended from
             * [Node EventEmitter object ](@link https://nodejs.org/api/events.html) to catch async errors
             * hence to bind event Emitter to context this is done
             */
            ns.bindEmitter(req);
            ns.bindEmitter(res);
            ns.set('tenantId', tenantId);
            ns.set('userId', userId);
            next();
        });
    };
}
