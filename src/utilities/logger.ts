import { config, createLogger, format, transports } from 'winston';
import * as Transport from 'winston-transport';
import { CONFIG } from '../configs/config';

const myConsoleFormat = format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`);

const transportList: Transport[] = [];
if (CONFIG.ENV === 'production') {
    transportList.push(
        new transports.File({
            filename: 'logs/APPLICATION_ERROR.log',
            level: 'error',
        }),
    );
    transportList.push(
        new transports.File({ filename: 'logs/APPLICATION_INFO.log', level: 'info' }),
    );
    transportList.push(new transports.File({ filename: 'logs/ACCESS.log', level: 'http' }));
} else {
    transportList.push(
        new transports.Console({
            format: format.combine(format.colorize({ all: true }), myConsoleFormat),
        }),
    );
}

export const logger = createLogger({
    level: CONFIG.ENV === 'development' ? 'debug' : 'http',
    levels: config.npm.levels,
    defaultMeta: {
        service: CONFIG.APP_NAME,
    },
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
        format.errors({ stack: true }),
        format.splat(),
        format.json(),
    ),
    transports: transportList,
});
