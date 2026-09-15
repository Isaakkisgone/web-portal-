export interface Device {
  id: string;
  deviceId: string;
  name: string;
  model: string;
  manufacturer: string;
  osVersion: string;
  status: 'ACTIVE' | 'INACTIVE' | 'DECOMMISSIONED';
  createdAt: string;
  updatedAt: string;
}

export interface CreateDeviceInput {
  deviceId: string;
  name: string;
  model: string;
  manufacturer: string;
  osVersion: string;
  status?: 'ACTIVE' | 'INACTIVE' | 'DECOMMISSIONED';
}

export interface Account {
  id: string;
  accountNumber: string;
  accountName: string;
  accountType: 'SAVINGS' | 'CHECKING' | 'INVESTMENT' | 'BUSINESS';
  balance: number;
  currency: string;
  status: 'ACTIVE' | 'SUSPENDED' | 'CLOSED';
  email: string;
  avatarUrl?: string;
  avatarLocalPath?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAccountInput {
  accountName: string;
  accountType: 'SAVINGS' | 'CHECKING' | 'INVESTMENT' | 'BUSINESS';
  initialBalance: number;
  currency?: string;
  email: string;
  avatarUrl?: string;
  downloadAvatar?: boolean;
}

export interface ImageDownloadResult {
  originalUrl: string;
  localPath: string;
  fileName: string;
  fileSizeBytes: number;
  contentType: string;
  downloadedAt: string;
}

export interface ServiceHealth {
  status: 'UP' | 'DOWN' | 'CHECKING';
  service: string;
  environment?: string;
  uptimeSeconds?: number;
  timestamp?: string;
  latencyMs?: number;
  system?: {
    nodeVersion: string;
    platform: string;
    memoryUsageMb?: {
      rss: number;
      heapTotal: number;
      heapUsed: number;
    };
  };
}
