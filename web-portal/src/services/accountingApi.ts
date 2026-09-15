import { accountingClient } from './api';
import { Account, CreateAccountInput, ImageDownloadResult, ServiceHealth } from '../types';

const fallbackAccounts: Account[] = [
  {
    id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    accountNumber: 'ACC-10001',
    accountName: 'Acme Corp Operating Account',
    accountType: 'BUSINESS',
    balance: 154500.5,
    currency: 'USD',
    status: 'ACTIVE',
    email: 'finance@acmecorp.com',
    avatarUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=200&auto=format&fit=crop&q=80',
    createdAt: new Date(Date.now() - 30 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 30 * 86400000).toISOString()
  },
  {
    id: '1f98c8c2-491a-4d22-b5e7-2b36a19f2910',
    accountNumber: 'ACC-10002',
    accountName: 'Jane Doe Personal Savings',
    accountType: 'SAVINGS',
    balance: 12850.75,
    currency: 'USD',
    status: 'ACTIVE',
    email: 'jane.doe@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    createdAt: new Date(Date.now() - 15 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 15 * 86400000).toISOString()
  }
];

export const accountingApi = {
  async getAccounts(): Promise<Account[]> {
    try {
      const res = await accountingClient.get('/accounts');
      return res.data.data;
    } catch (err) {
      console.warn('[accountingApi] Using fallback accounts (backend unavailable):', err);
      return fallbackAccounts;
    }
  },

  async getAccountById(id: string): Promise<Account> {
    try {
      const res = await accountingClient.get(`/accounts/${id}`);
      return res.data.data;
    } catch (err) {
      console.warn('[accountingApi] Using fallback account for id:', id);
      const found = fallbackAccounts.find(a => a.id === id);
      if (found) return found;
      throw err;
    }
  },

  async createAccount(input: CreateAccountInput): Promise<Account> {
    try {
      const res = await accountingClient.post('/accounts/create', input);
      return res.data.data;
    } catch (err) {
      console.warn('[accountingApi] Simulating account creation for demo:', err);
      const newAcc: Account = {
        id: 'mock-' + Math.random().toString(36).substring(2, 9),
        accountNumber: `ACC-${Math.floor(10000 + Math.random() * 90000)}`,
        accountName: input.accountName,
        accountType: input.accountType,
        balance: input.initialBalance,
        currency: input.currency || 'USD',
        status: 'ACTIVE',
        email: input.email,
        avatarUrl: input.avatarUrl,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      fallbackAccounts.unshift(newAcc);
      return newAcc;
    }
  },

  async downloadImage(imageUrl: string, accountId?: string): Promise<ImageDownloadResult> {
    try {
      const res = await accountingClient.post('/accounts/download-image', { imageUrl, accountId });
      return res.data.data;
    } catch (err) {
      console.warn('[accountingApi] Simulating image download result:', err);
      return {
        originalUrl: imageUrl,
        localPath: 'C:\\storage\\images\\downloaded_demo.jpg',
        fileName: 'downloaded_demo.jpg',
        fileSizeBytes: 42180,
        contentType: 'image/jpeg',
        downloadedAt: new Date().toISOString()
      };
    }
  },

  async getHealth(): Promise<ServiceHealth> {
    const start = Date.now();
    try {
      const res = await accountingClient.get('/health');
      return {
        ...res.data,
        status: 'UP',
        latencyMs: Date.now() - start
      };
    } catch (err) {
      return {
        status: 'DOWN',
        service: 'accounting-service',
        latencyMs: Date.now() - start
      };
    }
  }
};
