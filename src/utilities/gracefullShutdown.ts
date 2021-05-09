import { Express } from 'express';
import { logger } from './logger';

type Server = ReturnType<Express['listen']>;

function shutDown(server: Server) {
    console.log('Received kill signal, shutting down gracefully...');

    server.close(() => {
        console.log('Server closed gracefully');
        process.exit(0);
    });

    setTimeout(() => {
        console.error('Could not gracefully shutdown, forcefully shutting down...');
        process.exit(1);
    }, 10000);
}

export const applyGracefullShutDownHandler = (server: Server): void => {
    logger.info('Gracefull shutdown handler applied');
    const shutDownHanlder = () => shutDown(server);
    process.on('SIGTERM', shutDownHanlder);
    process.on('SIGINT', shutDownHanlder);
};
