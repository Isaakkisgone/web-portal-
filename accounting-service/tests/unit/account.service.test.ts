import { AccountService, NotFoundError } from '../../src/services/account.service';
import { InMemoryAccountRepository } from '../../src/repositories/in-memory-account.repository';
import { ImageDownloaderService } from '../../src/services/image-downloader.service';
import { AccountType, CreateAccountDto } from '../../src/models/account.model';

describe('AccountService Unit Tests', () => {
  let repository: InMemoryAccountRepository;
  let imageDownloaderService: ImageDownloaderService;
  let accountService: AccountService;

  beforeEach(() => {
    repository = new InMemoryAccountRepository();
    repository.clear();
    imageDownloaderService = new ImageDownloaderService();
    accountService = new AccountService(repository, imageDownloaderService);
  });

  describe('createAccount', () => {
    it('should create an account with default currency and active status', async () => {
      const dto: CreateAccountDto = {
        accountName: 'Alice Smith Savings',
        accountType: AccountType.SAVINGS,
        initialBalance: 500,
        currency: 'USD',
        email: 'alice@example.com',
        downloadAvatar: false
      };

      const account = await accountService.createAccount(dto);

      expect(account).toBeDefined();
      expect(account.id).toBeDefined();
      expect(account.accountNumber).toMatch(/^ACC-\d{5}$/);
      expect(account.accountName).toBe('Alice Smith Savings');
      expect(account.balance).toBe(500);
      expect(account.status).toBe('ACTIVE');
      expect(account.email).toBe('alice@example.com');
    });

    it('should create an account and attempt image download if downloadAvatar is true', async () => {
      jest.spyOn(imageDownloaderService, 'downloadImage').mockResolvedValueOnce({
        originalUrl: 'https://picsum.photos/200/200',
        localPath: '/tmp/test.jpg',
        fileName: 'test.jpg',
        fileSizeBytes: 1024,
        contentType: 'image/jpeg',
        downloadedAt: new Date().toISOString()
      });

      const dto: CreateAccountDto = {
        accountName: 'Bob Jones Checking',
        accountType: AccountType.CHECKING,
        initialBalance: 1200,
        currency: 'USD',
        email: 'bob@example.com',
        avatarUrl: 'https://picsum.photos/200/200',
        downloadAvatar: true
      };

      const account = await accountService.createAccount(dto);

      expect(account.avatarLocalPath).toBe('/tmp/test.jpg');
      expect(account.avatarUrl).toBe('https://picsum.photos/200/200');
    });
  });

  describe('getAccountById', () => {
    it('should return account when it exists', async () => {
      const created = await accountService.createAccount({
        accountName: 'Charlie Brown',
        accountType: AccountType.INVESTMENT,
        initialBalance: 10000,
        currency: 'USD',
        email: 'charlie@example.com',
        downloadAvatar: false
      });

      const found = await accountService.getAccountById(created.id);
      expect(found).toBeDefined();
      expect(found.id).toBe(created.id);
    });

    it('should throw NotFoundError when account does not exist', async () => {
      await expect(accountService.getAccountById('non-existent-id')).rejects.toThrow(NotFoundError);
    });
  });

  describe('getAllAccounts', () => {
    it('should return all accounts created', async () => {
      await accountService.createAccount({
        accountName: 'First Account',
        accountType: AccountType.BUSINESS,
        initialBalance: 100,
        currency: 'USD',
        email: 'first@example.com',
        downloadAvatar: false
      });
      await accountService.createAccount({
        accountName: 'Second Account',
        accountType: AccountType.SAVINGS,
        initialBalance: 200,
        currency: 'USD',
        email: 'second@example.com',
        downloadAvatar: false
      });

      const accounts = await accountService.getAllAccounts();
      expect(accounts.length).toBe(2);
    });
  });
});
