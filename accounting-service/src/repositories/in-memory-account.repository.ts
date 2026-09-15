import { Account, AccountStatus, AccountType } from '../models/account.model';
import { IAccountRepository } from './account.repository';

export class InMemoryAccountRepository implements IAccountRepository {
  private accounts: Map<string, Account> = new Map();

  constructor() {
    this.seedInitialData();
  }

  private seedInitialData(): void {
    const seedAccounts: Account[] = [
      {
        id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
        accountNumber: 'ACC-10001',
        accountName: 'Acme Corp Operating Account',
        accountType: AccountType.BUSINESS,
        balance: 154500.5,
        currency: 'USD',
        status: AccountStatus.ACTIVE,
        email: 'finance@acmecorp.com',
        avatarUrl: 'https://picsum.photos/id/10/200/200',
        avatarLocalPath: undefined,
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '1f98c8c2-491a-4d22-b5e7-2b36a19f2910',
        accountNumber: 'ACC-10002',
        accountName: 'Jane Doe Personal Savings',
        accountType: AccountType.SAVINGS,
        balance: 12850.75,
        currency: 'USD',
        status: AccountStatus.ACTIVE,
        email: 'jane.doe@example.com',
        avatarUrl: 'https://picsum.photos/id/64/200/200',
        avatarLocalPath: undefined,
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];

    for (const acc of seedAccounts) {
      this.accounts.set(acc.id, acc);
    }
  }

  async create(account: Account): Promise<Account> {
    this.accounts.set(account.id, { ...account });
    return { ...account };
  }

  async findById(id: string): Promise<Account | null> {
    const acc = this.accounts.get(id);
    return acc ? { ...acc } : null;
  }

  async findByAccountNumber(accountNumber: string): Promise<Account | null> {
    for (const acc of this.accounts.values()) {
      if (acc.accountNumber === accountNumber) {
        return { ...acc };
      }
    }
    return null;
  }

  async findAll(): Promise<Account[]> {
    return Array.from(this.accounts.values()).map(a => ({ ...a }));
  }

  async update(id: string, updates: Partial<Account>): Promise<Account | null> {
    const existing = this.accounts.get(id);
    if (!existing) {
      return null;
    }
    const updated: Account = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.accounts.set(id, updated);
    return { ...updated };
  }

  async delete(id: string): Promise<boolean> {
    return this.accounts.delete(id);
  }

  async existsByAccountNumber(accountNumber: string): Promise<boolean> {
    for (const acc of this.accounts.values()) {
      if (acc.accountNumber === accountNumber) {
        return true;
      }
    }
    return false;
  }

  // Helper for testing
  public clear(): void {
    this.accounts.clear();
  }
}
