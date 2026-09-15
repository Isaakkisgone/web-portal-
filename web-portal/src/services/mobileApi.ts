import { mobileClient } from './api';
import { CreateDeviceInput, Device, ServiceHealth } from '../types';

const fallbackDevices: Device[] = [
  {
    id: '4a1e948c-7f5b-4ec2-a279-79f826ce5a78',
    deviceId: 'DEV-IPH-001',
    name: 'Executive iPhone',
    model: 'iPhone 16 Pro Max',
    manufacturer: 'Apple',
    osVersion: 'iOS 18.2',
    status: 'ACTIVE',
    createdAt: new Date(Date.now() - 45 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 45 * 86400000).toISOString()
  },
  {
    id: '8c983a54-3b2d-4187-bb78-f7b5f1cbdf19',
    deviceId: 'DEV-SAM-002',
    name: 'Field Operations Tablet',
    model: 'Galaxy Tab S9 Ultra',
    manufacturer: 'Samsung',
    osVersion: 'Android 14',
    status: 'ACTIVE',
    createdAt: new Date(Date.now() - 20 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 20 * 86400000).toISOString()
  },
  {
    id: 'c2b6f4e1-8973-4560-b6ec-753ba54117ae',
    deviceId: 'DEV-PIX-003',
    name: 'QA Test Device',
    model: 'Pixel 9 Pro',
    manufacturer: 'Google',
    osVersion: 'Android 15',
    status: 'ACTIVE',
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 86400000).toISOString()
  }
];

export const mobileApi = {
  async getDevices(params?: { manufacturer?: string; status?: string }): Promise<Device[]> {
    try {
      const res = await mobileClient.get('/devices', { params });
      return res.data.data;
    } catch (err) {
      console.warn('[mobileApi] Using fallback devices (backend unavailable):', err);
      let list = [...fallbackDevices];
      if (params?.manufacturer) {
        list = list.filter(d => d.manufacturer.toLowerCase() === params.manufacturer?.toLowerCase());
      }
      if (params?.status) {
        list = list.filter(d => d.status === params.status);
      }
      return list;
    }
  },

  async getDeviceById(id: string): Promise<Device> {
    try {
      const res = await mobileClient.get(`/devices/${id}`);
      return res.data.data;
    } catch (err) {
      console.warn('[mobileApi] Using fallback device for id:', id);
      const found = fallbackDevices.find(d => d.id === id || d.deviceId === id);
      if (found) return found;
      throw err;
    }
  },

  async createDevice(input: CreateDeviceInput): Promise<Device> {
    try {
      const res = await mobileClient.post('/devices', input);
      return res.data.data;
    } catch (err) {
      console.warn('[mobileApi] Backend offline, simulating creation for demo:', err);
      const newDev: Device = {
        id: 'mock-' + Math.random().toString(36).substring(2, 9),
        ...input,
        status: input.status || 'ACTIVE',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      fallbackDevices.unshift(newDev);
      return newDev;
    }
  },

  async getHealth(): Promise<ServiceHealth> {
    const start = Date.now();
    try {
      const res = await mobileClient.get('/health');
      return {
        ...res.data,
        status: 'UP',
        latencyMs: Date.now() - start
      };
    } catch (err) {
      return {
        status: 'DOWN',
        service: 'mobile-service',
        latencyMs: Date.now() - start
      };
    }
  }
};
