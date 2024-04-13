import supertest from 'supertest';
import server from '../../src/server';
const request = supertest(server.app);

import mongoose from 'mongoose';
import { SecretModel } from '../../src/adapters/repositories/SecretModel';
import { UrlId } from '../../src/domain/models/UrlId';
import { SecretNotFoundInRepositoryError } from '../../src/domain/models/errors/SecretNotFoundInRepositoriesError';

describe('Get Secrets from One Time Secret API End-to-End Tests', () => {
  beforeAll(async () => {
    await SecretModel.deleteMany({});
    await SecretModel.create({ urlId: '123456qwerty', secret: '123qwe' });
  });
  it('should retrieve a secret from database', async () => {
    const res = await request.get('/api/v1/secret/123456qwerty');
    // Assert
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ secret: '123qwe' });
  });

  it('should retrieve not found error if try to get same secret twice', async () => {
    const expectedMessage = {
      title: 'SecretNotFoundInRepositoryError',
      message: 'Secret was not found in the repository',
    };
    const res = await request.get('/api/v1/secret/123456qwerty');
    // Assert

    expect(res.status).toBe(404);
    expect(res.body).toEqual(expectedMessage);
  });

  it('should retrieve and not found error if it does not exit', async () => {
    const expectedMessage = {
      title: 'SecretNotFoundInRepositoryError',
      message: 'Secret was not found in the repository',
    };
    const res = await request.get('/api/v1/secret/fakeInventUrlId');
    // Assert

    expect(res.status).toBe(404);
    expect(res.body).toEqual(expectedMessage);
  });

  it('should retrieve and not found error if url is not valid less than 10 character', async () => {
    const expectedMessage = {
      title: 'UrlIdTooShortError',
      message: 'UrlId is too short',
    };
    const res = await request.get('/api/v1/secret/qwe');
    // Assert

    expect(res.status).toBe(400);
    expect(res.body).toEqual(expectedMessage);
  });
});
