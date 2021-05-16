import morgan, { StreamOptions } from 'morgan';

import { CONFIG } from '../configs/config';
import { logger } from '../utilities';

// Override the stream method by telling
// Morgan to use our custom logger instead of the console.log.
const stream: StreamOptions = {
    write: (message) => logger.http(message),
};

export const morganMiddleware = morgan(CONFIG.ENV === 'development' ? 'dev' : 'short', {
    stream,
});
