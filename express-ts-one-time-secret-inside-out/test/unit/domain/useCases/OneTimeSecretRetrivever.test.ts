import { Secret } from '../../../../src/domain/models/Secret';
import { UrlId } from '../../../../src/domain/models/UrlId';
import { OneTimeSecretRetriever } from '../../../../src/domain/useCases/OneTimeSecretRetriever';
import { SecretRepository } from '../../../../src/domain/port/out/SecretRepository';

describe('OneTimeSecretRetriever', () => {
  it('should retrieve a secret one time', async () => {
    const secretRepository: SecretRepository = {
      getSecretByUrlId: jest.fn().mockResolvedValue(new Secret('123qwe')),
      removeSecretByUrlId: jest.fn(),
      storeUrlIdAndSecret: function (urlId: UrlId, secret: Secret): Promise<void> {
        throw new Error('Function not implemented.');
      },
    };
    const oneTimeSecretRetriever = new OneTimeSecretRetriever(secretRepository);
    const urlId = new UrlId('123456qwerty');
    expect(await oneTimeSecretRetriever.retrieveSecret(urlId)).toEqual(new Secret('123qwe'));
    expect(secretRepository.getSecretByUrlId).toHaveBeenCalledTimes(1);
    expect(secretRepository.getSecretByUrlId).toHaveBeenCalledWith(urlId);
    expect(secretRepository.removeSecretByUrlId).toHaveBeenCalledTimes(1);
    expect(secretRepository.removeSecretByUrlId).toHaveBeenCalledWith(urlId);
  });
});
