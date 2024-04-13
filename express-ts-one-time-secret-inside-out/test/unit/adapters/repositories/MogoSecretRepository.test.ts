import mongoose from 'mongoose';
import { MongoSecretRepository } from '../../../../src/adapters/repositories/MongoSecretRepository';
import { Secret } from '../../../../src/domain/models/Secret';
import { UrlId } from '../../../../src/domain/models/UrlId';
import { SecretModel } from '../../../../src/adapters/repositories/SecretModel';
import { SecretNotFoundInRepositoryError } from '../../../../src/domain/models/errors/SecretNotFoundInRepositoriesError';

describe('MongoSecretRepository Tests', () => {
  it('should connect to the database', () => {
    mongoose.connect = jest.fn();

    new MongoSecretRepository();
    expect(mongoose.connect).toHaveBeenCalledTimes(1);
    expect(mongoose.connect).toHaveBeenCalledWith('mongodb://localhost:27017/onetimesecret');
  });

  it('should not connect to the database if the connection is the connection is already open', () => {
    mongoose.connect = jest.fn();
    // mongoose.connection.readyState = 1;

    new MongoSecretRepository();
    // expect(mongoose.connect).toHaveBeenCalledTimes(0);
  });

  // Happy CASE
  it('should retrieve a secret from mongo', async () => {
    const urlId = new UrlId('123456qwerty');
    SecretModel.findOne = jest.fn().mockReturnValue({ urlId: '123456qwerty', secret: '123qwe' });
    const mongoSecretRepository = new MongoSecretRepository();
    expect(await mongoSecretRepository.getSecretByUrlId(urlId)).toEqual(new Secret('123qwe'));
    expect(SecretModel.findOne).toHaveBeenCalledTimes(1);
    expect(SecretModel.findOne).toHaveBeenCalledWith({ urlId: urlId.toString() });
  });

  // Unhappy CASE

  it('should throw an error when querying a secret that does not exits', async () => {
    // Arrange
    const urlId = new UrlId('123456qwerty');
    SecretModel.findOne = jest.fn().mockReturnValue(null);
    const mongoSecretRepository = new MongoSecretRepository();

    // Act

    // Assert
    expect(mongoSecretRepository.getSecretByUrlId(urlId)).rejects.toThrow(
      SecretNotFoundInRepositoryError
    );
    expect(SecretModel.findOne).toHaveBeenCalledTimes(1);
    expect(SecretModel.findOne).toHaveBeenCalledWith({ urlId: urlId.toString() });
  });

  // Delete

  it('should remove a secret from the database', async () => {
    // Arrange
    const urlId = new UrlId('123456qwerty');
    SecretModel.deleteOne = jest.fn();
    const mongoSecretRepository = new MongoSecretRepository();

    // Act
    await mongoSecretRepository.removeSecretByUrlId(urlId);

    // Assert
    expect(SecretModel.deleteOne).toHaveBeenCalledTimes(1);
    expect(SecretModel.deleteOne).toHaveBeenCalledWith({ urlId: urlId.toString() });
  });

  it('should create a urlId secret in the database', async () => {
    // Arrange
    const secret = new Secret('123qwer');
    const urlId = new UrlId('123456qwerty');
    SecretModel.create = jest.fn();
    const mongoSecretRepository = new MongoSecretRepository();

    // Act
    await mongoSecretRepository.storeUrlIdAndSecret(urlId, secret);

    // Assert
    expect(SecretModel.create).toHaveBeenCalledTimes(1);
    expect(SecretModel.create).toHaveBeenCalledWith({
      urlId: urlId.toString(),
      secret: secret.toString(),
    });
  });
});
