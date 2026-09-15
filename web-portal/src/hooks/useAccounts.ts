import { useState, useEffect, useCallback } from 'react';
import { Account, CreateAccountInput, ImageDownloadResult } from '../types';
import { accountingApi } from '../services/accountingApi';

export function useAccounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAccounts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await accountingApi.getAccounts();
      setAccounts(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch accounts');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  const addAccount = async (input: CreateAccountInput): Promise<Account> => {
    const created = await accountingApi.createAccount(input);
    setAccounts(prev => [created, ...prev]);
    return created;
  };

  const downloadImage = async (imageUrl: string, accountId?: string): Promise<ImageDownloadResult> => {
    const result = await accountingApi.downloadImage(imageUrl, accountId);
    if (accountId) {
      // update local account state with image
      setAccounts(prev =>
        prev.map(acc =>
          acc.id === accountId
            ? { ...acc, avatarUrl: result.originalUrl, avatarLocalPath: result.localPath }
            : acc
        )
      );
    }
    return result;
  };

  return {
    accounts,
    loading,
    error,
    refreshAccounts: fetchAccounts,
    addAccount,
    downloadImage
  };
}
