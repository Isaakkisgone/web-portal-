import { Device, DeviceStatus } from '../models/device.model';
import { IDeviceRepository } from './device.repository';

export class InMemoryDeviceRepository implements IDeviceRepository {
  private devices: Map<string, Device> = new Map();

  constructor() {
    this.seedInitialData();
  }

  private seedInitialData(): void {
    const sampleDevices: Device[] = [
      {
        id: '4a1e948c-7f5b-4ec2-a279-79f826ce5a78',
        deviceId: 'DEV-IPH-001',
        name: 'Executive iPhone',
        model: 'iPhone 16 Pro Max',
        manufacturer: 'Apple',
        osVersion: 'iOS 18.2',
        status: DeviceStatus.ACTIVE,
        createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '8c983a54-3b2d-4187-bb78-f7b5f1cbdf19',
        deviceId: 'DEV-SAM-002',
        name: 'Field Operations Tablet',
        model: 'Galaxy Tab S9 Ultra',
        manufacturer: 'Samsung',
        osVersion: 'Android 14',
        status: DeviceStatus.ACTIVE,
        createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'c2b6f4e1-8973-4560-b6ec-753ba54117ae',
        deviceId: 'DEV-PIX-003',
        name: 'QA Test Device',
        model: 'Pixel 9 Pro',
        manufacturer: 'Google',
        osVersion: 'Android 15',
        status: DeviceStatus.ACTIVE,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];

    for (const dev of sampleDevices) {
      this.devices.set(dev.id, dev);
    }
  }

  async create(device: Device): Promise<Device> {
    this.devices.set(device.id, { ...device });
    return { ...device };
  }

  async findById(id: string): Promise<Device | null> {
    // Check by internal UUID id or by deviceId
    const byId = this.devices.get(id);
    if (byId) return { ...byId };

    for (const dev of this.devices.values()) {
      if (dev.deviceId === id) {
        return { ...dev };
      }
    }
    return null;
  }

  async findByDeviceId(deviceId: string): Promise<Device | null> {
    for (const dev of this.devices.values()) {
      if (dev.deviceId === deviceId) {
        return { ...dev };
      }
    }
    return null;
  }

  async findAll(filter?: { manufacturer?: string; status?: string }): Promise<Device[]> {
    let list = Array.from(this.devices.values());
    if (filter?.manufacturer) {
      const mfg = filter.manufacturer.toLowerCase();
      list = list.filter(d => d.manufacturer.toLowerCase() === mfg);
    }
    if (filter?.status) {
      list = list.filter(d => d.status === filter.status);
    }
    return list.map(d => ({ ...d }));
  }

  async update(id: string, updates: Partial<Device>): Promise<Device | null> {
    const existing = await this.findById(id);
    if (!existing) {
      return null;
    }
    const updated: Device = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.devices.set(existing.id, updated);
    return { ...updated };
  }

  async delete(id: string): Promise<boolean> {
    const existing = await this.findById(id);
    if (!existing) return false;
    return this.devices.delete(existing.id);
  }

  async existsByDeviceId(deviceId: string): Promise<boolean> {
    for (const dev of this.devices.values()) {
      if (dev.deviceId === deviceId) {
        return true;
      }
    }
    return false;
  }

  // Testing helper
  public clear(): void {
    this.devices.clear();
  }
}
