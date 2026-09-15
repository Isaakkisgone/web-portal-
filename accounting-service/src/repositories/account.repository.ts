import { Account } from '../models/account.model';

export interface IAccountRepository {
  create(account: Account): Promise<Account>;
  findById(id: string): Promise<Account | null>;
  findByAccountNumber(accountNumber: string): Promise<Account | null>;
  findAll(): Promise<Account[]>;
  update(id: string, updates: Partial<Account>): Promise<Account | null>;
  delete(id: string): Promise<boolean>;
  existsByAccountNumber(accountNumber: string): Promise<boolean>;
}
