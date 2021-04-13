export class IDbManagerProps {
    setTenantDb: typeof DbManager.setTenantDb;
}

export class DbManager {
    public static setTenantDb: (tenantId: string) => void;
    public static initializeDbManager(props: IDbManagerProps): void {
        DbManager.setTenantDb = props.setTenantDb;
    }
}
