import request from 'supertest';
import { createApp } from '../../src/app';
import { InMemoryAccountRepository } from '../../src/repositories/in-memory-account.repository';
import { AccountType } from '../../src/models/account.model';

describe('Accounting Service API Integration Tests', () => {
  let repository: InMemoryAccountRepository;
  let app: any;

  beforeEach(() => {
    repository = new InMemoryAccountRepository();
    repository.clear();
    app = createApp(repository);
  });

  describe('POST /accounts/create', () => {
    it('should create an account and return 201', async () => {
      const payload = {
        accountName: 'Stark Industries R&D',
        accountType: AccountType.BUSINESS,
        initialBalance: 500000,
        currency: 'USD',
        email: 'tony@starkindustries.com',
        downloadAvatar: false
      };

      const res = await request(app)
        .post('/accounts/create')
        .send(payload)
        .expect(201);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toBeDefined();
      expect(res.body.data.accountName).toBe('Stark Industries R&D');
      expect(res.body.data.accountNumber).toMatch(/^ACC-\d{5}$/);
      expect(res.body.data.balance).toBe(500000);
      expect(res.headers['x-correlation-id']).toBeDefined();
    });

    it('should return 400 when required fields are missing', async () => {
      const invalidPayload = {
        accountName: 'A' // Too short, missing type, missing email
      };

      const res = await request(app)
        .post('/accounts/create')
        .send(invalidPayload)
        .expect(400);

      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe('VALIDATION_ERROR');
      expect(res.body.error.details.length).toBeGreaterThan(0);
    });
  });

  describe('GET /accounts', () => {
    it('should return 200 and list accounts', async () => {
      await request(app)
        .post('/accounts/create')
        .send({
          accountName: 'Account One',
          accountType: AccountType.SAVINGS,
          initialBalance: 100,
          currency: 'USD',
          email: 'one@example.com'
        })
        .expect(201);

      const res = await request(app)
        .get('/accounts')
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.count).toBe(1);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data[0].accountName).toBe('Account One');
    });
  });

  describe('GET /accounts/:id', () => {
    it('should return 200 and the account when it exists', async () => {
      const createdRes = await request(app)
        .post('/accounts/create')
        .send({
          accountName: 'Target Account',
          accountType: AccountType.CHECKING,
          initialBalance: 250,
          currency: 'USD',
          email: 'target@example.com'
        })
        .expect(201);

      const accountId = createdRes.body.data.id;

      const res = await request(app)
        .get(`/accounts/${accountId}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.id).toBe(accountId);
      expect(res.body.data.accountName).toBe('Target Account');
    });

    it('should return 404 when account does not exist', async () => {
      const res = await request(app)
        .get('/accounts/00000000-0000-0000-0000-000000000000')
        .expect(404);

      expect(res.body.success).toBe(false);
      expect(res.body.error.message).toContain('not found');
    });
  });
});
