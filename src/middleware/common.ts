import cookieParser from 'cookie-parser';
import cors from 'cors';
import { Application, json } from 'express';
import { morganMiddleware } from '../middleware/morgan';

export const applyCommon = (app: Application): void => {
    app.use(json());
    app.use(cors());
    app.set('trust proxy', true);
    app.use(cookieParser());
    app.use(morganMiddleware);
};
