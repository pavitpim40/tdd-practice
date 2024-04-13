import { NextFunction, request, response, Request, Response } from 'express';
import { SecretStorer } from '../../../../../src/domain/port/in/SecretStorer';
import { SecretsController } from '../../../../../src/adapters/rest/controllers/SecretController';
import { ValidationError } from '../../../../../src/adapters/rest/controllers/ValidationError';
import { UrlId } from '../../../../../src/domain/models/UrlId';

describe('Secret By Id Test', () => {
  it('should throw a validation error if the body of the request is not provide', () => {
    // Arrange
    const next: NextFunction = jest.fn();
    const req: Request = expect.any(request);
    const res: Response = expect.any(response);

    const secretStorer: SecretStorer = {
      storeSecret: jest.fn(),
    };
    const secretController = new SecretsController(secretStorer);

    // Act
    secretController.createSecret(req, res, next);

    // Assert
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(new ValidationError('Request body not valid'));
  });

  it('should throw a validation error if the body  does not have a secret', () => {
    // Arrange
    const next: NextFunction = jest.fn();
    const req: Request = expect.any(request);
    req.body = { abc: 'abc' };
    const res: Response = expect.any(response);

    const secretStorer: SecretStorer = {
      storeSecret: jest.fn(),
    };
    const secretController = new SecretsController(secretStorer);

    // Act
    secretController.createSecret(req, res, next);

    // Assert
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(new ValidationError('Request body not valid'));
  });

  it('should throw a validation error if secret is not a string', () => {
    // Arrange
    const next: NextFunction = jest.fn();
    const req: Request = expect.any(request);
    req.body = { secret: true };
    const res: Response = expect.any(response);

    const secretStorer: SecretStorer = {
      storeSecret: jest.fn(),
    };
    const secretController = new SecretsController(secretStorer);

    // Act
    secretController.createSecret(req, res, next);

    // Assert
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(new ValidationError('Request body not valid'));
  });

  it('should create a valid secret', async () => {
    // Arrange
    const next: NextFunction = jest.fn();
    const req: Request = expect.any(request);
    req.body = { secret: '123qwe' };
    const res: Response = expect.any(response);

    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();

    const secretStorer: SecretStorer = {
      storeSecret: jest.fn().mockResolvedValue(new UrlId('12345qwerty')),
    };
    const secretController = new SecretsController(secretStorer);

    // Act
    await secretController.createSecret(req, res, next);

    // Assert
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(new UrlId('12345qwerty'));
  });
});
