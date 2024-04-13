import { Request, Response, NextFunction } from 'express';
import { ValidationError } from './ValidationError';
import { SecretRetriever } from '../../../domain/port/in/SecretRetriever';
import { UrlId } from '../../../domain/models/UrlId';

export class SecretByIdController {
  constructor(private secretRetriever: SecretRetriever) {}

  private validateRequest(request: Request) {
    if (!request.params?.urlId) throw new ValidationError('URL is not Valid');
  }
  retrieveSecretByUrl = async (request: Request, response: Response, next: NextFunction) => {
    try {
      this.validateRequest(request);

      const urlId = new UrlId(request.params.urlId);
      const secret = await this.secretRetriever.retrieveSecret(urlId);
      return response.status(200).json(secret);
    } catch (error) {
      next(error);
    }
  };
}
