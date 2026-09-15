import { DeviceService, NotFoundError, ConflictError } from '../../src/services/device.service';
import { InMemoryDeviceRepository } from '../../src/repositories/in-memory-device.repository';
import { CreateDeviceDto, DeviceStatus } from '../../src/models/device.model';

describe('DeviceService Unit Tests', () => {
  let repository: InMemoryDeviceRepository;
  let deviceService: DeviceService;

  beforeEach(() => {
    repository = new InMemoryDeviceRepository();
    repository.clear();
    deviceService = new DeviceService(repository);
  });

  describe('createDevice', () => {
    it('should successfully register a new device', async () => {
      const dto: CreateDeviceDto = {
        deviceId: 'TEST-DEV-100',
        name: 'Field Engineer Phone',
        model: 'Pixel 8',
        manufacturer: 'Google',
        osVersion: 'Android 14',
        status: DeviceStatus.ACTIVE
      };

      const device = await deviceService.createDevice(dto);

      expect(device).toBeDefined();
      expect(device.id).toBeDefined();
      expect(device.deviceId).toBe('TEST-DEV-100');
      expect(device.name).toBe('Field Engineer Phone');
      expect(device.manufacturer).toBe('Google');
      expect(device.status).toBe(DeviceStatus.ACTIVE);
    });

    it('should throw ConflictError if deviceId already exists', async () => {
      const dto: CreateDeviceDto = {
        deviceId: 'DUPLICATE-ID',
        name: 'Device 1',
        model: 'Model X',
        manufacturer: 'Vendor A',
        osVersion: '1.0.0',
        status: DeviceStatus.ACTIVE
      };

      await deviceService.createDevice(dto);

      await expect(deviceService.createDevice(dto)).rejects.toThrow(ConflictError);
    });
  });

  describe('getDeviceById', () => {
    it('should return device by internal ID', async () => {
      const created = await deviceService.createDevice({
        deviceId: 'DEV-UNIQ-1',
        name: 'Tablet',
        model: 'Tab A9',
        manufacturer: 'Samsung',
        osVersion: 'Android 13',
        status: DeviceStatus.ACTIVE
      });

      const found = await deviceService.getDeviceById(created.id);
      expect(found).toBeDefined();
      expect(found.id).toBe(created.id);
    });

    it('should return device by hardware deviceId', async () => {
      const created = await deviceService.createDevice({
        deviceId: 'DEV-UNIQ-2',
        name: 'Phone',
        model: 'iPhone 15',
        manufacturer: 'Apple',
        osVersion: 'iOS 17.0',
        status: DeviceStatus.ACTIVE
      });

      const found = await deviceService.getDeviceById(created.deviceId);
      expect(found).toBeDefined();
      expect(found.id).toBe(created.id);
    });

    it('should throw NotFoundError if device is not found', async () => {
      await expect(deviceService.getDeviceById('non-existent')).rejects.toThrow(NotFoundError);
    });
  });

  describe('getAllDevices', () => {
    it('should filter devices by manufacturer', async () => {
      await deviceService.createDevice({
        deviceId: 'APPLE-1',
        name: 'iPhone 1',
        model: 'iPhone 15',
        manufacturer: 'Apple',
        osVersion: 'iOS 17',
        status: DeviceStatus.ACTIVE
      });
      await deviceService.createDevice({
        deviceId: 'SAM-1',
        name: 'Galaxy 1',
        model: 'S24',
        manufacturer: 'Samsung',
        osVersion: 'Android 14',
        status: DeviceStatus.ACTIVE
      });

      const appleDevices = await deviceService.getAllDevices({ manufacturer: 'Apple' });
      expect(appleDevices.length).toBe(1);
      expect(appleDevices[0].manufacturer).toBe('Apple');
    });
  });
});
