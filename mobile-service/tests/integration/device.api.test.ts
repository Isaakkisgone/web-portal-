import request from 'supertest';
import { createApp } from '../../src/app';
import { InMemoryDeviceRepository } from '../../src/repositories/in-memory-device.repository';

describe('Mobile Service API Integration Tests', () => {
  let repository: InMemoryDeviceRepository;
  let app: any;

  beforeEach(() => {
    repository = new InMemoryDeviceRepository();
    repository.clear();
    app = createApp(repository);
  });

  describe('POST /devices', () => {
    it('should register a device and return 201', async () => {
      const payload = {
        deviceId: 'DEV-INT-001',
        name: 'Warehouse Scanner',
        model: 'Zebra TC52',
        manufacturer: 'Zebra',
        osVersion: 'Android 11'
      };

      const res = await request(app)
        .post('/devices')
        .send(payload)
        .expect(201);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toBeDefined();
      expect(res.body.data.deviceId).toBe('DEV-INT-001');
      expect(res.body.data.name).toBe('Warehouse Scanner');
      expect(res.body.data.status).toBe('ACTIVE');
      expect(res.headers['x-correlation-id']).toBeDefined();
    });

    it('should return 400 when validation fails', async () => {
      const invalidPayload = {
        deviceId: 'AB' // too short, missing name, model, manufacturer, osVersion
      };

      const res = await request(app)
        .post('/devices')
        .send(invalidPayload)
        .expect(400);

      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe('VALIDATION_ERROR');
    });

    it('should return 409 on duplicate deviceId', async () => {
      const payload = {
        deviceId: 'DEV-DUP-001',
        name: 'Device A',
        model: 'Model A',
        manufacturer: 'Brand A',
        osVersion: '1.0'
      };

      await request(app).post('/devices').send(payload).expect(201);

      const res = await request(app).post('/devices').send(payload).expect(409);
      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe('ConflictError');
    });
  });

  describe('GET /devices', () => {
    it('should return 200 and list devices', async () => {
      await request(app).post('/devices').send({
        deviceId: 'DEV-LIST-1',
        name: 'Dev 1',
        model: 'Mod 1',
        manufacturer: 'Brand A',
        osVersion: '1.0'
      });
      await request(app).post('/devices').send({
        deviceId: 'DEV-LIST-2',
        name: 'Dev 2',
        model: 'Mod 2',
        manufacturer: 'Brand B',
        osVersion: '2.0'
      });

      const res = await request(app).get('/devices').expect(200);
      expect(res.body.success).toBe(true);
      expect(res.body.count).toBe(2);
      expect(res.body.data.length).toBe(2);
    });

    it('should filter devices by manufacturer query parameter', async () => {
      await request(app).post('/devices').send({
        deviceId: 'DEV-APL',
        name: 'iPhone 15',
        model: 'A3090',
        manufacturer: 'Apple',
        osVersion: 'iOS 17'
      });
      await request(app).post('/devices').send({
        deviceId: 'DEV-SMS',
        name: 'Galaxy S23',
        model: 'SM-S911B',
        manufacturer: 'Samsung',
        osVersion: 'Android 14'
      });

      const res = await request(app).get('/devices?manufacturer=Apple').expect(200);
      expect(res.body.count).toBe(1);
      expect(res.body.data[0].manufacturer).toBe('Apple');
    });
  });

  describe('GET /devices/:id', () => {
    it('should return 200 and device when found', async () => {
      const created = await request(app).post('/devices').send({
        deviceId: 'DEV-FIND-1',
        name: 'Find Me',
        model: 'Find Model',
        manufacturer: 'Find Brand',
        osVersion: '1.0'
      });

      const id = created.body.data.id;
      const res = await request(app).get(`/devices/${id}`).expect(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.deviceId).toBe('DEV-FIND-1');
    });

    it('should return 404 when device not found', async () => {
      const res = await request(app).get('/devices/unknown-id').expect(404);
      expect(res.body.success).toBe(false);
      expect(res.body.error.message).toContain('not found');
    });
  });
});
