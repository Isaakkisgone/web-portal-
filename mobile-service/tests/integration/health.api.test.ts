import request from 'supertest';
import { createApp } from '../../src/app';

describe('Mobile Service Health API Integration Test', () => {
  const app = createApp();

  it('GET /health should return 200 with UP status and mobile-service service tag', async () => {
    const res = await request(app).get('/health').expect(200);

    expect(res.body.status).toBe('UP');
    expect(res.body.service).toBe('mobile-service');
    expect(res.body.system).toBeDefined();
    expect(res.body.system.nodeVersion).toBeDefined();
  });
});
