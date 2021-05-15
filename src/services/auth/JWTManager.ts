import { ERROR_CODE, IUserJwtTokenPayload } from '@sellerspot/universal-types';
import jwt from 'jsonwebtoken';
import { CONFIG } from '../../configs/config';
import { NotAuthorizedError } from '../../errors';
import { logger } from '../../utilities';

export class JWTManager {
    static createToken(payload: IUserJwtTokenPayload): string {
        const token: string = jwt.sign(
            {
                ...payload,
            },
            CONFIG.APP_SECRET,
            { expiresIn: CONFIG.JWT_EXPIRE_TIME },
        );
        return token;
    }
    static verify(suppliedToken: string): IUserJwtTokenPayload {
        try {
            const token = <IUserJwtTokenPayload>jwt.verify(suppliedToken, CONFIG.APP_SECRET);
            return token;
        } catch (err) {
            logger.error(`Error while getting jwt token`);
            throw new NotAuthorizedError(ERROR_CODE.INVALID_TOKEN, 'Token Invalid');
        }
    }
}
