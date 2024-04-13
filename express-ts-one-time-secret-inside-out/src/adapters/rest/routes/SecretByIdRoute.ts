import { Application } from 'express';
import { Route } from './Route';
import { SecretByIdController } from '../controllers/SecretByIdController';

export class SecretByIdRoute implements Route {
  constructor(private secretController: SecretByIdController) {}
  mountRoute(application: Application): void {
    application.route('/api/v1/secret/:urlId').get(this.secretController.retrieveSecretByUrl);
  }
}
