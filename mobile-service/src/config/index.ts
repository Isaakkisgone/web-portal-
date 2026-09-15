import dotenv from 'dotenv';
import { developmentConfig } from './development';
import { testConfig } from './test';
import { productionConfig } from './production';

dotenv.config();

export interface AppConfig {
  port: number;
  nodeEnv: string;
  logLevel: string;
}

const env = process.env.NODE_ENV || 'development';

let baseConfig: AppConfig;

switch (env) {
  case 'production':
  case 'prod':
    baseConfig = productionConfig;
    break;
  case 'test':
    baseConfig = testConfig;
    break;
  case 'development':
  case 'dev':
  default:
    baseConfig = developmentConfig;
    break;
}

export const config: AppConfig = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : baseConfig.port,
  nodeEnv: env,
  logLevel: process.env.LOG_LEVEL || baseConfig.logLevel
};
