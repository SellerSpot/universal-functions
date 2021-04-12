export interface IDbManagerProps {
    setTenantDb: (tenantId: string) => void;
}

export class DbManager {
    public static INSTANCE: DbManager;
    setTenantDb: (tenantId: string) => void;
    constructor(props: IDbManagerProps) {
        this.setTenantDb = props.setTenantDb;
        DbManager.INSTANCE = this;
    }
}
