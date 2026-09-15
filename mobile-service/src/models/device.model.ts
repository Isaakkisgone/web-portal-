import { z } from 'zod';

export enum DeviceStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DECOMMISSIONED = 'DECOMMISSIONED'
}

export interface Device {
  id: string;
  deviceId: string;
  name: string;
  model: string;
  manufacturer: string;
  osVersion: string;
  status: DeviceStatus;
  createdAt: string;
  updatedAt: string;
}

export const CreateDeviceSchema = z.object({
  deviceId: z
    .string()
    .min(3, 'deviceId must be at least 3 characters')
    .max(64, 'deviceId cannot exceed 64 characters'),
  name: z
    .string()
    .min(2, 'name must be at least 2 characters')
    .max(100, 'name cannot exceed 100 characters'),
  model: z
    .string()
    .min(1, 'model is required')
    .max(100, 'model cannot exceed 100 characters'),
  manufacturer: z
    .string()
    .min(1, 'manufacturer is required')
    .max(100, 'manufacturer cannot exceed 100 characters'),
  osVersion: z
    .string()
    .min(1, 'osVersion is required')
    .max(50, 'osVersion cannot exceed 50 characters'),
  status: z.nativeEnum(DeviceStatus).optional().default(DeviceStatus.ACTIVE)
});

export type CreateDeviceDto = z.infer<typeof CreateDeviceSchema>;

export const UpdateDeviceSchema = CreateDeviceSchema.partial();
export type UpdateDeviceDto = z.infer<typeof UpdateDeviceSchema>;
