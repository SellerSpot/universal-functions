import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, _, res) => {
    res.send({ status: false, error: err.message });
};

export default errorHandler;
