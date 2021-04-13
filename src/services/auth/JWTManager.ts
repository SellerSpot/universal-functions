import jwt from 'jsonwebtoken';
import { ITenantJWTToken, ERROR_CODE } from '@sellerspot/universal-types';
import { logger, error } from '../..';

export class JWTManager {
    static createToken(payload: ITenantJWTToken): string {
        const token: string = jwt.sign(
            {
                ...payload,
            },
            process.env.APP_SECRET,
        );
        return token;
    }
    static compare(suppliedToken: string): ITenantJWTToken {
        try {
            const token = <ITenantJWTToken>jwt.verify(suppliedToken, process.env.APP_SECRET);
            return token;
        } catch (err) {
            logger.error(`Error while getting jwt token`);
            throw new error.NotAuthorizedError(ERROR_CODE.INVALID_TOKEN, 'Token Invalid');
        }
    }
}
