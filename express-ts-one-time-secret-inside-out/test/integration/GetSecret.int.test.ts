import supertest from 'supertest';
import server from '../../src/server';
const request = supertest(server.app);

import mongoose from 'mongoose';
import { SecretModel } from '../../src/adapters/repositories/SecretModel';
import { UrlId } from '../../src/domain/models/UrlId';

describe('Get Secrets from One Time Secret API Integration Tests', () => {
  it('should retrieve a secret from database', async () => {
    SecretModel.findOne = jest.fn().mockResolvedValue({ secret: '123qwe' });
    SecretModel.deleteOne = jest.fn();

    const res = await request.get('/api/v1/secret/123456qwerty');
    // Assert
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ secret: '123qwe' });
    expect(SecretModel.findOne).toHaveBeenCalledTimes(1);
    expect(SecretModel.findOne).toHaveBeenCalledWith(new UrlId('123456qwerty'));
    expect(SecretModel.deleteOne).toHaveBeenCalledTimes(1);
    expect(SecretModel.deleteOne).toHaveBeenCalledWith(new UrlId('123456qwerty'));
  });

  it('should retrieve an error if the secret doest not exits in database', async () => {
    SecretModel.findOne = jest.fn().mockResolvedValue(null);
    SecretModel.deleteOne = jest.fn();
    const expectedMessage = {
      title: 'SecretNotFoundInRepositoryError',
      message: 'Secret was not found in the repository',
    };
    const res = await request.get('/api/v1/secret/123456qwerty');
    // Assert
    expect(SecretModel.findOne).toHaveBeenCalledTimes(1);
    expect(SecretModel.findOne).toHaveBeenCalledWith(new UrlId('123456qwerty'));
    expect(SecretModel.deleteOne).toHaveBeenCalledTimes(0);
    expect(res.status).toBe(404);
    expect(res.body).toEqual(expectedMessage);
  });
});
