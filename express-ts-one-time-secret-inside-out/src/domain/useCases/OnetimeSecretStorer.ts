import { Secret } from '../models/Secret';
import { UrlId } from '../models/UrlId';
import { SecretRepository } from '../port/out/SecretRepository';
import { SecretStorer } from '../port/in/SecretStorer';
import { TokenGenerator } from '../port/out/TokenGenerator';

export class OneTimeSecretStorer implements SecretStorer {
  constructor(private secretRepository: SecretRepository, private tokenGenerator: TokenGenerator) {}
  async storeSecret(secret: Secret): Promise<UrlId> {
    const token = this.tokenGenerator.generateToken();
    const urlId = new UrlId(token);
    await this.secretRepository.storeUrlIdAndSecret(urlId, secret);
    return urlId;
  }
}
