import { useState, useEffect, useCallback } from 'react';
import { ServiceHealth } from '../types';
import { mobileApi } from '../services/mobileApi';
import { accountingApi } from '../services/accountingApi';

export function useServiceHealth() {
  const [mobileHealth, setMobileHealth] = useState<ServiceHealth>({
    status: 'CHECKING',
    service: 'mobile-service'
  });
  const [accountingHealth, setAccountingHealth] = useState<ServiceHealth>({
    status: 'CHECKING',
    service: 'accounting-service'
  });
  const [lastChecked, setLastChecked] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const checkHealth = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const [mHealth, aHealth] = await Promise.all([
        mobileApi.getHealth(),
        accountingApi.getHealth()
      ]);
      setMobileHealth(mHealth);
      setAccountingHealth(aHealth);
      setLastChecked(new Date());
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, [checkHealth]);

  return {
    mobileHealth,
    accountingHealth,
    lastChecked,
    isRefreshing,
    refreshHealth: checkHealth
  };
}
