import { transports, config, format, createLogger } from 'winston';
import * as Transport from 'winston-transport';

const myConsoleFormat = format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`);

const transportList: Transport[] = [];
if (process.env.ENV !== 'development') {
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
    level: process.env.ENV === 'development' ? 'debug' : 'http',
    levels: config.npm.levels,
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
        format.errors({ stack: true }),
        format.splat(),
        format.json(),
    ),
    transports: transportList,
});
