import { useState, useEffect, useCallback } from 'react';
import { CreateDeviceInput, Device } from '../types';
import { mobileApi } from '../services/mobileApi';

export function useDevices() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDevices = useCallback(async (params?: { manufacturer?: string; status?: string }) => {
    setLoading(true);
    setError(null);
    try {
      const data = await mobileApi.getDevices(params);
      setDevices(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch devices');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDevices();
  }, [fetchDevices]);

  const addDevice = async (input: CreateDeviceInput): Promise<Device> => {
    const created = await mobileApi.createDevice(input);
    setDevices(prev => [created, ...prev]);
    return created;
  };

  return {
    devices,
    loading,
    error,
    refreshDevices: fetchDevices,
    addDevice
  };
}
