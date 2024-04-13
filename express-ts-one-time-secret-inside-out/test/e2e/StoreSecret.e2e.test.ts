import supertest from 'supertest';
import server from '../../src/server';
import { SecretModel } from '../../src/adapters/repositories/SecretModel';
const request = supertest(server.app);

describe('Store Secrets from One Time Secret API End-to-End Tests', () => {
  beforeAll(async () => {
    await SecretModel.deleteMany({});
  });
  it('should store a secret in database', async () => {
    const res = await request.post('/api/v1/secret').send({
      secret: '123qwe',
    });
    // Assert
    expect(res.status).toBe(201);
    expect(res.body.urlId.length).toBeGreaterThanOrEqual(10);
  });

  it('should have created a secret in the database', async () => {
    const doc = await SecretModel.findOne({
      secret: '123qwe',
    });

    expect(doc.secret).toBe('123qwe');
    expect(doc.urlId.length).toBeGreaterThan(10);
    expect(typeof doc.urlId).toBe('string');
  });

  it('should receive and error when sending a secret too short', async () => {
    const res = await request.post('/api/v1/secret').send({
      secret: '12',
    });
    // Assert
    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      title: 'SecretTooShortError',
      message: 'Secret is too short',
    });
  });

  it('should receive and error when body is not correct', async () => {
    const res = await request.post('/api/v1/secret').send({
      password: '123qwer',
    });
    // Assert
    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      title: 'ValidationError',
      message: 'Request body not valid',
    });
  });

  it('should receive and error when type of the secret is not valid', async () => {
    const res = await request.post('/api/v1/secret').send({
      secret: 12345678,
    });
    // Assert
    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      title: 'ValidationError',
      message: 'Request body not valid',
    });
  });
});
