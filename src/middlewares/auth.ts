import { RequestHandler } from 'express';

const authHandler: RequestHandler = (req, res, next) => {
    // req auth validation logic goes here
    next();
};

export default authHandler;
