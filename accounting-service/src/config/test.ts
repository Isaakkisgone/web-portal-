export const testConfig = {
  port: 8089,
  nodeEnv: 'test',
  logLevel: 'error',
  imageStoragePath: './storage/test_images',
  defaultImageUrl: 'https://picsum.photos/200/200',
  imageDownloadTimeoutMs: 5000,
  maxImageSizeBytes: 5 * 1024 * 1024 // 5MB
};
