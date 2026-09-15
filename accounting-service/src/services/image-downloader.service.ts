import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../config';
import { DownloadedImageResult } from '../models/account.model';
import { logger } from '../utils/logger';

export class ImageDownloaderService {
  private readonly storageDir: string;
  private readonly timeoutMs: number;
  private readonly maxSizeBytes: number;

  constructor(
    storageDir: string = config.imageStoragePath,
    timeoutMs: number = config.imageDownloadTimeoutMs,
    maxSizeBytes: number = config.maxImageSizeBytes
  ) {
    this.storageDir = storageDir;
    this.timeoutMs = timeoutMs;
    this.maxSizeBytes = maxSizeBytes;
    this.ensureStorageDirectory();
  }

  private ensureStorageDirectory(): void {
    try {
      if (!fs.existsSync(this.storageDir)) {
        fs.mkdirSync(this.storageDir, { recursive: true });
        logger.info(`Created image storage directory at: ${this.storageDir}`);
      }
    } catch (err) {
      logger.error('Failed to create image storage directory', { error: err, path: this.storageDir });
    }
  }

  private getExtensionFromMimeType(mimeType: string): string {
    const map: Record<string, string> = {
      'image/jpeg': '.jpg',
      'image/jpg': '.jpg',
      'image/png': '.png',
      'image/gif': '.gif',
      'image/webp': '.webp',
      'image/svg+xml': '.svg'
    };
    return map[mimeType.toLowerCase()] || '.img';
  }

  async downloadImage(imageUrl?: string): Promise<DownloadedImageResult> {
    const targetUrl = imageUrl || config.defaultImageUrl;
    this.ensureStorageDirectory();

    logger.info(`Initiating image download from: ${targetUrl}`);
    const startTime = Date.now();

    try {
      const response = await axios.get(targetUrl, {
        responseType: 'arraybuffer',
        timeout: this.timeoutMs,
        maxContentLength: this.maxSizeBytes,
        headers: {
          'User-Agent': 'AccountingService-ImageDownloader/1.0'
        }
      });

      const rawContentType = response.headers['content-type'];
      const contentType = typeof rawContentType === 'string' ? rawContentType : 'image/jpeg';
      if (!contentType.toLowerCase().startsWith('image/')) {
        throw new Error(`Invalid content type received: ${contentType}. Expected an image.`);
      }

      const buffer = Buffer.from(response.data);
      if (buffer.length > this.maxSizeBytes) {
        throw new Error(`Downloaded image size (${buffer.length} bytes) exceeds limit (${this.maxSizeBytes} bytes)`);
      }

      const ext = this.getExtensionFromMimeType(contentType);
      const fileName = `img_${uuidv4()}${ext}`;
      const localFilePath = path.join(this.storageDir, fileName);

      await fs.promises.writeFile(localFilePath, buffer);

      const durationMs = Date.now() - startTime;
      logger.info('Image downloaded and saved successfully', {
        targetUrl,
        fileName,
        sizeBytes: buffer.length,
        durationMs
      });

      return {
        originalUrl: targetUrl,
        localPath: localFilePath,
        fileName,
        fileSizeBytes: buffer.length,
        contentType,
        downloadedAt: new Date().toISOString()
      };
    } catch (error: any) {
      const durationMs = Date.now() - startTime;
      logger.error('Failed to download image', {
        targetUrl,
        durationMs,
        errorMessage: error.message
      });
      throw new Error(`Failed to download image from ${targetUrl}: ${error.message}`);
    }
  }
}
