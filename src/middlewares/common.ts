import cookieParser from 'cookie-parser';
import { Application, json } from 'express';
import { morganMiddleware } from './morgan';

export const applyCommon = (app: Application): void => {
    app.use(json());
    app.set('trust proxy', true);
    app.use(cookieParser());
    app.use(morganMiddleware);
};
