import { RequestHandler } from 'express';
import { getNamespace } from 'continuation-local-storage';
import { CONFIG } from '../configs/config';

export const clearScope: RequestHandler = (req, res, next): void => {
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
