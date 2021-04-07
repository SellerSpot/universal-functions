import { json, Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { morganMiddleware } from './morgan';

export const applyCommon = (app: Application): void => {
    app.use(json());
    app.use(cors());
    app.set('trust proxy', true);
    app.use(cookieParser());
    app.use(morganMiddleware);
};
