import supertest from 'supertest';
import server from '../../src/server';
const request = supertest(server.app);

import { SecretModel } from '../../src/adapters/repositories/SecretModel';

describe('Store Secrets from One Time Secret API Integration Tests', () => {
  it('should store a secret in database', async () => {
    SecretModel.create = jest.fn();

    const res = await request.post('/api/v1/secret').send({
      secret: '123qwe',
    });
    // Assert
    expect(res.status).toBe(201);
    expect(res.body.urlId.length).toBeGreaterThanOrEqual(10);

    expect(SecretModel.create).toHaveBeenCalledTimes(1);
    expect(SecretModel.create).toHaveBeenCalledWith({
      secret: '123qwe',
      urlId: res.body.urlId,
    });
  });

  it('should receive an error if the secret is smaller than 3 character', async () => {
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
});
