import { NextFunction, Request, Response } from 'express';
import { SecretStorer } from '../../../domain/port/in/SecretStorer';
import { ValidationError } from './ValidationError';
import { Secret } from '../../../domain/models/Secret';

export class SecretsController {
  constructor(private secretStorer: SecretStorer) {}
  createSecret = async (request: Request, response: Response, next: NextFunction) => {
    try {
      this.validateRequest(request);
      const secret = new Secret(request.body.secret);
      const urlId = await this.secretStorer.storeSecret(secret);
      response.status(201).json(urlId);
    } catch (error) {
      next(error);
    }
  };

  validateRequest(request: Request) {
    // .log(request.body);
    if (!request.body || !request.body?.secret || typeof request.body.secret !== 'string') {
      throw new ValidationError('Request body not valid');
    }
  }
}
