import { errorHandler } from './middleware/ErrorHandler';
import { Route } from './routes/Route';
import express from 'express';

export class Application {
  public app: express.Application = express();

  constructor(private routeList: Route[]) {
    this.appConfig();
    this.mountRoutes();
    this.app.use(errorHandler);
  }

  private mountRoutes() {
    this.routeList.forEach((route) => route.mountRoute(this.app));
  }

  private appConfig() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  startServerOnPort(port: number): void {
    this.app.listen(port, () => {
      console.info(`Listening on port ${port}`);
    });
  }
}
