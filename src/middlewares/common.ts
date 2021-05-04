import cookieParser from 'cookie-parser';
import cors from 'cors';
import { Application, json } from 'express';
import { morganMiddleware } from './morgan';

export const applyCommon = (app: Application): void => {
    app.use(json());
    // app.use(
    //     cors({
    //         origin:
    //             process.env.ENV === 'production'
    //                 ? RegexUtil.PRODUCTION_WILDCARD
    //                 : RegexUtil.DEV_WILDCARD,
    //         credentials: true,
    //     }),
    // );
    app.set('trust proxy', true);
    app.use(cookieParser());
    app.use(morganMiddleware);
};
