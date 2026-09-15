import request from 'supertest';
import { createApp } from '../../src/app';

describe('Health Check API Integration Test', () => {
  const app = createApp();

  it('GET /health should return 200 with UP status and system metrics', async () => {
    const res = await request(app).get('/health').expect(200);

    expect(res.body.status).toBe('UP');
    expect(res.body.service).toBe('accounting-service');
    expect(res.body.system).toBeDefined();
    expect(res.body.system.nodeVersion).toBeDefined();
    expect(res.body.uptimeSeconds).toBeGreaterThanOrEqual(0);
  });
});
