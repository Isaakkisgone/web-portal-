import { v4 as uuidv4 } from 'uuid';
import { CreateDeviceDto, Device, DeviceStatus, UpdateDeviceDto } from '../models/device.model';
import { IDeviceRepository } from '../repositories/device.repository';
import { logger } from '../utils/logger';

export class NotFoundError extends Error {
  statusCode = 404;
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends Error {
  statusCode = 409;
  constructor(message: string) {
    super(message);
    this.name = 'ConflictError';
  }
}

export class DeviceService {
  constructor(private readonly deviceRepository: IDeviceRepository) {}

  async createDevice(dto: CreateDeviceDto): Promise<Device> {
    logger.info('Registering new device', { deviceId: dto.deviceId, manufacturer: dto.manufacturer });

    const exists = await this.deviceRepository.existsByDeviceId(dto.deviceId);
    if (exists) {
      throw new ConflictError(`Device with deviceId '${dto.deviceId}' already exists`);
    }

    const now = new Date().toISOString();
    const device: Device = {
      id: uuidv4(),
      deviceId: dto.deviceId,
      name: dto.name,
      model: dto.model,
      manufacturer: dto.manufacturer,
      osVersion: dto.osVersion,
      status: dto.status || DeviceStatus.ACTIVE,
      createdAt: now,
      updatedAt: now
    };

    const created = await this.deviceRepository.create(device);
    logger.info('Device registered successfully', { id: created.id, deviceId: created.deviceId });
    return created;
  }

  async getDeviceById(id: string): Promise<Device> {
    const device = await this.deviceRepository.findById(id);
    if (!device) {
      throw new NotFoundError(`Device with id or deviceId '${id}' not found`);
    }
    return device;
  }

  async getAllDevices(filter?: { manufacturer?: string; status?: string }): Promise<Device[]> {
    return this.deviceRepository.findAll(filter);
  }

  async updateDevice(id: string, updates: UpdateDeviceDto): Promise<Device> {
    const updated = await this.deviceRepository.update(id, updates);
    if (!updated) {
      throw new NotFoundError(`Device with id or deviceId '${id}' not found for update`);
    }
    logger.info('Device updated', { id, updates });
    return updated;
  }

  async deleteDevice(id: string): Promise<boolean> {
    const deleted = await this.deviceRepository.delete(id);
    if (!deleted) {
      throw new NotFoundError(`Device with id or deviceId '${id}' not found for deletion`);
    }
    logger.info('Device deleted', { id });
    return true;
  }
}
