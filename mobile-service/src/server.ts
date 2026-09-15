import { createApp } from './app';
import { config } from './config';
import { logger } from './utils/logger';

const app = createApp();

const server = app.listen(config.port, () => {
  logger.info(`========================================================`);
  logger.info(`Mobile Service started successfully`);
  logger.info(`Port:        ${config.port}`);
  logger.info(`Environment: ${config.nodeEnv}`);
  logger.info(`Health:      http://localhost:${config.port}/health`);
  logger.info(`Swagger UI:  http://localhost:${config.port}/api-docs`);
  logger.info(`========================================================`);
});

const shutdown = (signal: string) => {
  logger.info(`Received ${signal}. Gracefully shutting down Mobile Service...`);
  server.close(() => {
    logger.info('HTTP server closed. Exiting process.');
    process.exit(0);
  });

  setTimeout(() => {
    logger.error('Forced shutdown after 10s timeout.');
    process.exit(1);
  }, 10000).unref();
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
