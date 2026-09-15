import { v4 as uuidv4 } from 'uuid';
import {
  Account,
  AccountStatus,
  AccountType,
  CreateAccountDto,
  DownloadedImageResult
} from '../models/account.model';
import { IAccountRepository } from '../repositories/account.repository';
import { ImageDownloaderService } from './image-downloader.service';
import { logger } from '../utils/logger';

export class NotFoundError extends Error {
  statusCode = 404;
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends Error {
  statusCode = 409;
  constructor(message: string) {
    super(message);
    this.name = 'ConflictError';
  }
}

export class AccountService {
  constructor(
    private readonly accountRepository: IAccountRepository,
    private readonly imageDownloaderService: ImageDownloaderService
  ) {}

  private generateAccountNumber(): string {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    return `ACC-${randomSuffix}`;
  }

  async createAccount(dto: CreateAccountDto): Promise<Account> {
    logger.info('Creating new account', { email: dto.email, accountType: dto.accountType });

    let accountNumber = this.generateAccountNumber();
    while (await this.accountRepository.existsByAccountNumber(accountNumber)) {
      accountNumber = this.generateAccountNumber();
    }

    let localImagePath: string | undefined;
    if (dto.downloadAvatar) {
      try {
        const downloadResult = await this.imageDownloaderService.downloadImage(dto.avatarUrl);
        localImagePath = downloadResult.localPath;
      } catch (err: any) {
        logger.warn('Failed to download avatar image during account creation, proceeding without local avatar', {
          error: err.message
        });
      }
    }

    const now = new Date().toISOString();
    const account: Account = {
      id: uuidv4(),
      accountNumber,
      accountName: dto.accountName,
      accountType: dto.accountType,
      balance: dto.initialBalance ?? 0,
      currency: dto.currency || 'USD',
      status: AccountStatus.ACTIVE,
      email: dto.email,
      avatarUrl: dto.avatarUrl,
      avatarLocalPath: localImagePath,
      createdAt: now,
      updatedAt: now
    };

    const saved = await this.accountRepository.create(account);
    logger.info('Account created successfully', { accountId: saved.id, accountNumber: saved.accountNumber });
    return saved;
  }

  async getAccountById(id: string): Promise<Account> {
    const account = await this.accountRepository.findById(id);
    if (!account) {
      throw new NotFoundError(`Account with id '${id}' not found`);
    }
    return account;
  }

  async getAllAccounts(): Promise<Account[]> {
    return this.accountRepository.findAll();
  }

  async downloadAndStoreImage(imageUrl?: string, accountId?: string): Promise<DownloadedImageResult> {
    const result = await this.imageDownloaderService.downloadImage(imageUrl);

    if (accountId) {
      const account = await this.accountRepository.findById(accountId);
      if (account) {
        await this.accountRepository.update(accountId, {
          avatarUrl: result.originalUrl,
          avatarLocalPath: result.localPath
        });
        logger.info('Associated downloaded image with account', { accountId, imagePath: result.localPath });
      }
    }

    return result;
  }
}
