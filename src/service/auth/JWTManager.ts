import { ERROR_CODE, ITenantJWTToken } from '@sellerspot/universal-types';
import jwt from 'jsonwebtoken';
import { ServerConstant } from '../../config/constant';
import { NotAuthorizedError } from '../../error';
import { logger } from '../../utility';

export class JWTManager {
    static createToken(payload: ITenantJWTToken): string {
        const token: string = jwt.sign(
            {
                ...payload,
            },
            process.env.APP_SECRET,
            { expiresIn: ServerConstant.JWT_EXPIRE_TIME },
        );
        return token;
    }
    static compare(suppliedToken: string): ITenantJWTToken {
        try {
            const token = <ITenantJWTToken>jwt.verify(suppliedToken, process.env.APP_SECRET);
            return token;
        } catch (err) {
            logger.error(`Error while getting jwt token`);
            throw new NotAuthorizedError(ERROR_CODE.INVALID_TOKEN, 'Token Invalid');
        }
    }
}
