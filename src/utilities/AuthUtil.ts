import { CONFIG } from '../configs/config';
import { getNamespace, createNamespace } from 'continuation-local-storage';
import { IUserJwtTokenPayload } from '@sellerspot/universal-types';

export class AuthUtil {
    public static getCurrentUserId(): string {
        const ns = getNamespace(CONFIG.APP_NAME());
        const tenantId = <string>ns.get('tenantId');
        return tenantId;
    }

    public static getCurrentTenantId(): string {
        const ns = getNamespace(CONFIG.APP_NAME());
        const tenantId = <string>ns.get('tenantId');
        return tenantId;
    }

    /**
     * Should be used with CAUTION as it can lead to data leak
     */
    public static setCurrentTenant(tenantId: string): void {
        let ns = getNamespace(CONFIG.APP_NAME());
        if (!ns) ns = createNamespace(CONFIG.APP_NAME());
        //run will create new context and enters to that context overriding any exisiting context in execution
        ns.enter(
            ns.run(() => {
                ns.set('tenantId', tenantId);
            }),
        );
    }

    /**
     * Should be used with CAUTION as it can lead to data leak
     */
    public static setCurrentUser(userId: string): void {
        let ns = getNamespace(CONFIG.APP_NAME());
        if (!ns) ns = createNamespace(CONFIG.APP_NAME());
        //run will create new context and enters to that context overriding any exisiting context in execution
        ns.enter(
            ns.run(() => {
                ns.set('userId', userId);
            }),
        );
    }

    /**
     * Should be used with CAUTION as it can lead to data leak
     */
    public static setCurrentContext(authPayload: IUserJwtTokenPayload): void {
        let ns = getNamespace(CONFIG.APP_NAME());
        if (!ns) ns = createNamespace(CONFIG.APP_NAME());
        //run will create new context and enters to that context overriding any exisiting context in execution
        ns.enter(
            ns.run(() => {
                ns.set('tenantId', authPayload.tenantId);
                ns.set('userId', authPayload.userId);
            }),
        );
    }
}
