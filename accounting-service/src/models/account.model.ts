import { z } from 'zod';

export enum AccountType {
  SAVINGS = 'SAVINGS',
  CHECKING = 'CHECKING',
  INVESTMENT = 'INVESTMENT',
  BUSINESS = 'BUSINESS'
}

export enum AccountStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  CLOSED = 'CLOSED'
}

export interface Account {
  id: string;
  accountNumber: string;
  accountName: string;
  accountType: AccountType;
  balance: number;
  currency: string;
  status: AccountStatus;
  email: string;
  avatarUrl?: string;
  avatarLocalPath?: string;
  createdAt: string;
  updatedAt: string;
}

export const CreateAccountSchema = z.object({
  accountName: z.string().min(2, 'Account name must be at least 2 characters').max(100),
  accountType: z.nativeEnum(AccountType, {
    errorMap: () => ({ message: 'accountType must be SAVINGS, CHECKING, INVESTMENT, or BUSINESS' })
  }),
  initialBalance: z.number().min(0, 'Initial balance cannot be negative').default(0),
  currency: z.string().length(3, 'Currency must be a 3-letter ISO code').default('USD'),
  email: z.string().email('Invalid email address format'),
  avatarUrl: z.string().url('avatarUrl must be a valid URL').optional(),
  downloadAvatar: z.boolean().optional().default(false)
});

export type CreateAccountDto = z.infer<typeof CreateAccountSchema>;

export const DownloadImageSchema = z.object({
  imageUrl: z.string().url('imageUrl must be a valid URL'),
  accountId: z.string().uuid('accountId must be a valid UUID').optional()
});

export type DownloadImageDto = z.infer<typeof DownloadImageSchema>;

export interface DownloadedImageResult {
  originalUrl: string;
  localPath: string;
  fileName: string;
  fileSizeBytes: number;
  contentType: string;
  downloadedAt: string;
}
