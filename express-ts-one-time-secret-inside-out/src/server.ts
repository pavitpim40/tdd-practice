import { UniqidTokenGenerator } from './adapters/externalServices/UniqidTokenGenerator';
import { MongoSecretRepository } from './adapters/repositories/MongoSecretRepository';
import { Application } from './adapters/rest/Application';
import { SecretByIdController } from './adapters/rest/controllers/SecretByIdController';
import { SecretsController } from './adapters/rest/controllers/SecretController';
import { Route } from './adapters/rest/routes/Route';
import { SecretByIdRoute } from './adapters/rest/routes/SecretByIdRoute';
import { SecretRoute } from './adapters/rest/routes/SecretRoute';
import { OneTimeSecretRetriever } from './domain/useCases/OneTimeSecretRetriever';
import { OneTimeSecretStorer } from './domain/useCases/OnetimeSecretStorer';

const secretRepository = new MongoSecretRepository();

// Secret
const tokenGenerator = new UniqidTokenGenerator();
const secretStorer = new OneTimeSecretStorer(secretRepository, tokenGenerator);
const secretController = new SecretsController(secretStorer);
const secretRoute = new SecretRoute(secretController);

// SecretById
const secretRetriever = new OneTimeSecretRetriever(secretRepository);
const secretByIdController = new SecretByIdController(secretRetriever);
const secretByIdRoute = new SecretByIdRoute(secretByIdController);

const routeList: Route[] = [];
routeList.push(secretRoute, secretByIdRoute);

const application: Application = new Application(routeList);

// application.startServerOnPort(parseInt(process.argv[2]) || 3000);

export default application;
