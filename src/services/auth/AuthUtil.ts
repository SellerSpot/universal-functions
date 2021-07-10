import { CONFIG } from '../../configs/config';
import { getNamespace, createNamespace } from 'continuation-local-storage';
import { IUserJwtTokenPayload } from '@sellerspot/universal-types';

type authTokenKey = 'userId' | 'tenantId';

export class AuthUtil {
    public static getCurrentUserId(): string {
        const authKey: authTokenKey = 'userId';
        const ns = getNamespace(CONFIG.APP_NAME());
        const tenantId = <string>ns.get(authKey);
        return tenantId;
    }

    public static getCurrentTenantId(): string {
        const authKey: authTokenKey = 'tenantId';
        const ns = getNamespace(CONFIG.APP_NAME());
        const tenantId = <string>ns.get(authKey);
        return tenantId;
    }

    /**
     * Should be used with CAUTION as it can lead to data leak
     */
    public static setCurrentTenant(tenantId: string): void {
        let ns = getNamespace(CONFIG.APP_NAME());
        if (!ns) ns = createNamespace(CONFIG.APP_NAME());
        //checks if there is active context and if not creates a context and enters that context
        if (!ns.active) {
            ns.enter(ns.createContext());
        }
        //sets tenant Id in current active context
        ns.set('tenantId', tenantId);
    }

    /**
     * Should be used with CAUTION as it can lead to data leak
     */
    public static setCurrentUser(userId: string): void {
        let ns = getNamespace(CONFIG.APP_NAME());
        if (!ns) ns = createNamespace(CONFIG.APP_NAME());
        //checks if there is active context and if not creates a context and enters that context
        if (!ns.active) {
            ns.enter(ns.createContext());
        }
        //sets user Id in current active context
        ns.set('userId', userId);
    }

    /**
     * Should be used with CAUTION as it can lead to data leak
     */
    public static setCurrentScope(authPayload: IUserJwtTokenPayload): void {
        let ns = getNamespace(CONFIG.APP_NAME());
        if (!ns) ns = createNamespace(CONFIG.APP_NAME());
        //checks if there is active context and if not creates a context and enters that context
        if (!ns.active) {
            ns.enter(ns.createContext());
        }
        //sets current scope
        ns.set('tenantId', authPayload.tenantId);
        ns.set('userId', authPayload.userId);
    }
}
