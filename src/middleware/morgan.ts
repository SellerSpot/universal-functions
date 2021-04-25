import morgan, { StreamOptions } from 'morgan';
import { logger } from '../utility';

// Override the stream method by telling
// Morgan to use our custom logger instead of the console.log.
const stream: StreamOptions = {
    write: (message) => logger.http(message),
};

export const morganMiddleware = morgan(process.env.ENV === 'development' ? 'dev' : 'short', {
    stream,
});
