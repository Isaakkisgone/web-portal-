import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { ImageDownloaderService } from '../../src/services/image-downloader.service';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ImageDownloaderService Unit Tests', () => {
  const testStorageDir = path.resolve(__dirname, '../../storage/test_downloads');
  let service: ImageDownloaderService;

  beforeAll(() => {
    service = new ImageDownloaderService(testStorageDir, 5000, 1024 * 1024);
  });

  afterAll(async () => {
    if (fs.existsSync(testStorageDir)) {
      await fs.promises.rm(testStorageDir, { recursive: true, force: true });
    }
  });

  it('should download and save an image successfully', async () => {
    const fakeBuffer = Buffer.from('fake-image-bytes');
    mockedAxios.get.mockResolvedValueOnce({
      data: fakeBuffer,
      headers: {
        'content-type': 'image/jpeg'
      }
    });

    const result = await service.downloadImage('https://example.com/photo.jpg');

    expect(result).toBeDefined();
    expect(result.contentType).toBe('image/jpeg');
    expect(result.fileSizeBytes).toBe(fakeBuffer.length);
    expect(fs.existsSync(result.localPath)).toBe(true);

    const content = await fs.promises.readFile(result.localPath);
    expect(content.toString()).toBe('fake-image-bytes');
  });

  it('should throw an error if the content type is not an image', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: Buffer.from('<html>not an image</html>'),
      headers: {
        'content-type': 'text/html'
      }
    });

    await expect(service.downloadImage('https://example.com/page.html')).rejects.toThrow(
      /Expected an image/
    );
  });

  it('should throw an error if download exceeds max size', async () => {
    const largeBuffer = Buffer.alloc(2 * 1024 * 1024); // 2MB exceeds 1MB max
    mockedAxios.get.mockResolvedValueOnce({
      data: largeBuffer,
      headers: {
        'content-type': 'image/png'
      }
    });

    await expect(service.downloadImage('https://example.com/large.png')).rejects.toThrow(
      /exceeds limit/
    );
  });
});
