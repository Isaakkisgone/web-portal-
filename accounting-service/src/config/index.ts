import dotenv from 'dotenv';
import path from 'path';
import { developmentConfig } from './development';
import { testConfig } from './test';
import { productionConfig } from './production';

dotenv.config();

export interface AppConfig {
  port: number;
  nodeEnv: string;
  logLevel: string;
  imageStoragePath: string;
  defaultImageUrl: string;
  imageDownloadTimeoutMs: number;
  maxImageSizeBytes: number;
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
  logLevel: process.env.LOG_LEVEL || baseConfig.logLevel,
  imageStoragePath: process.env.IMAGE_STORAGE_PATH
    ? path.resolve(process.env.IMAGE_STORAGE_PATH)
    : path.resolve(baseConfig.imageStoragePath),
  defaultImageUrl: process.env.DEFAULT_IMAGE_URL || baseConfig.defaultImageUrl,
  imageDownloadTimeoutMs: process.env.IMAGE_DOWNLOAD_TIMEOUT_MS
    ? parseInt(process.env.IMAGE_DOWNLOAD_TIMEOUT_MS, 10)
    : baseConfig.imageDownloadTimeoutMs,
  maxImageSizeBytes: process.env.MAX_IMAGE_SIZE_BYTES
    ? parseInt(process.env.MAX_IMAGE_SIZE_BYTES, 10)
    : baseConfig.maxImageSizeBytes
};
