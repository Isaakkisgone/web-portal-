import { Device } from '../models/device.model';

export interface IDeviceRepository {
  create(device: Device): Promise<Device>;
  findById(id: string): Promise<Device | null>;
  findByDeviceId(deviceId: string): Promise<Device | null>;
  findAll(filter?: { manufacturer?: string; status?: string }): Promise<Device[]>;
  update(id: string, updates: Partial<Device>): Promise<Device | null>;
  delete(id: string): Promise<boolean>;
  existsByDeviceId(deviceId: string): Promise<boolean>;
}
