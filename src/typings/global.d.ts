import { ITenantJWTToken } from '@sellerspot/universal-types';

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            ENV: 'development' | 'production';
            APP_NAME: string;
            APP_VERSION: string;
            PORT: string;
            DATABASE_SERVER_URL: string;
            DATABASE_SERVER_QUERY: string;
            APP_SECRET: string;
        }
    }
    namespace Express {
        interface Request {
            currentTenant?: ITenantJWTToken;
        }
    }
}

// convert it into a module by adding an empty export statement.
export {};
