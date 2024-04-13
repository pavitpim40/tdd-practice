import { Secret } from '../../../../src/domain/models/Secret';
import { UrlId } from '../../../../src/domain/models/UrlId';
import { OneTimeSecretStorer } from '../../../../src/domain/useCases/OnetimeSecretStorer';
import { SecretRepository } from '../../../../src/domain/port/out/SecretRepository';
import { TokenGenerator } from '../../../../src/domain/port/out/TokenGenerator';

describe('OneTimeSecretStorer Tests', () => {
  it('should store a secret and return a urlId to query after', async () => {
    const secret = new Secret('123qwe');
    const urlId = new UrlId('123456qwerty');
    const tokenGenerator: TokenGenerator = {
      generateToken: jest.fn().mockReturnValue('123456qwerty'),
    };
    const secretRepository: SecretRepository = {
      getSecretByUrlId: jest.fn(),
      removeSecretByUrlId: jest.fn(),
      storeUrlIdAndSecret: jest.fn(),
    };
    const oneTimeSecretStorer = new OneTimeSecretStorer(secretRepository, tokenGenerator);
    expect(await oneTimeSecretStorer.storeSecret(secret)).toEqual(urlId);
    expect(secretRepository.storeUrlIdAndSecret).toHaveBeenCalledTimes(1);
    expect(secretRepository.storeUrlIdAndSecret).toHaveBeenCalledWith(urlId, secret);
    expect(tokenGenerator.generateToken).toHaveBeenCalledTimes(1);
    // expect(tokenGenerator.generateToken).toHaveBeenCalledWith(secret);
  });
});
