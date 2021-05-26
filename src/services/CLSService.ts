import { createNamespace, getNamespace } from 'continuation-local-storage';
import { RequestHandler } from 'express';
import { IUserJwtTokenPayload } from '@sellerspot/universal-types';

import { CONFIG } from '../configs/config';

/**
 * Continuation local storage
 */
export default class CLSService {
    static clearScope: RequestHandler = (_, __, next): void => {
        const ns = getNamespace(CONFIG.APP_NAME());
        if (ns) {
            //Sets as undefined once a request is completed to current active context in execution flow
            ns.bind(() => {
                ns.set('tenantId', void 0);
                ns.set('userId', void 0);
            });
        }
        next();
    };

    static bindEmitter = async (
        req: NodeJS.EventEmitter,
        res: NodeJS.EventEmitter,
    ): Promise<boolean> => {
        return new Promise((resolve) => {
            let ns = getNamespace(CONFIG.APP_NAME());
            if (!ns) ns = createNamespace(CONFIG.APP_NAME());
            ns.bindEmitter(req);
            ns.bindEmitter(res);
            resolve(true);
        });
    };

    static setData = async (data: Partial<IUserJwtTokenPayload>): Promise<boolean> => {
        return new Promise((resolve) => {
            let ns = getNamespace(CONFIG.APP_NAME());
            if (!ns) ns = createNamespace(CONFIG.APP_NAME());
            ns.enter(
                ns.run(() => {
                    const dataKeys = <(keyof IUserJwtTokenPayload)[]>Object.keys(data);
                    dataKeys.map((key) => {
                        ns.set(key, data[key]);
                    });
                    resolve(true);
                }),
            );
        });
    };

    static getData = (key: keyof IUserJwtTokenPayload): string => {
        const ns = getNamespace(CONFIG.APP_NAME());
        const tenantId = ns?.get(key);
        return <string>tenantId;
    };
}
