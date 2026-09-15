export const productionConfig = {
  port: 8081,
  nodeEnv: 'production',
  logLevel: 'info',
  imageStoragePath: process.env.IMAGE_STORAGE_PATH || '/app/storage/images',
  defaultImageUrl: process.env.DEFAULT_IMAGE_URL || 'https://picsum.photos/400/300',
  imageDownloadTimeoutMs: 15000,
  maxImageSizeBytes: 10 * 1024 * 1024 // 10MB
};
