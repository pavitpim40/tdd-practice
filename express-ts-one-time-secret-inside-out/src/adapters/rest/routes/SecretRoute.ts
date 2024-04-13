import { Application } from 'express';
import { Route } from './Route';
import { SecretsController } from '../controllers/SecretController';

export class SecretRoute implements Route {
  constructor(private secretController: SecretsController) {}
  mountRoute(application: Application): void {
    application.route('/api/v1/secret').post(this.secretController.createSecret);
  }
}
