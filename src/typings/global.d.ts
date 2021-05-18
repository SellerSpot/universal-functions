import { IUserJwtTokenPayload } from '@sellerspot/universal-types';

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            ENV: 'development' | 'production';
            APP_NAME: string;
            APP_SECRET: string;
            DOMAIN: string;
        }
    }
    namespace Express {
        interface Request {
            currentUser?: IUserJwtTokenPayload;
        }
    }
}

// convert it into a module by adding an empty export statement.
export {};
