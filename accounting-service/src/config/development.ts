export const developmentConfig = {
  port: 8081,
  nodeEnv: 'development',
  logLevel: 'debug',
  imageStoragePath: './storage/images',
  defaultImageUrl: 'https://picsum.photos/400/300',
  imageDownloadTimeoutMs: 10000,
  maxImageSizeBytes: 10 * 1024 * 1024 // 10MB
};
