import winston from 'winston';
import { config } from '../config';

const { combine, timestamp, printf, colorize, json, errors } = winston.format;

const consoleFormat = printf(({ level, message, timestamp, service, stack, ...meta }) => {
  const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
  const stackStr = stack ? `\n${stack}` : '';
  return `[${timestamp}] [${service}] ${level}: ${message}${metaStr}${stackStr}`;
});

export const logger = winston.createLogger({
  level: config.logLevel,
  defaultMeta: { service: 'accounting-service' },
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    errors({ stack: true }),
    config.nodeEnv === 'production' ? json() : combine(colorize(), consoleFormat)
  ),
  transports: [
    new winston.transports.Console({
      silent: config.nodeEnv === 'test' && process.env.ENABLE_TEST_LOGS !== 'true'
    })
  ]
});
