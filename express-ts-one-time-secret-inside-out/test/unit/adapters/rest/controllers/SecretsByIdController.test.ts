import { NextFunction, request, response, Request, Response } from 'express';
import { ValidationError } from '../../../../../src/adapters/rest/controllers/ValidationError';
import { SecretByIdController } from '../../../../../src/adapters/rest/controllers/SecretByIdController';
import { SecretNotFoundInRepositoryError } from '../../../../../src/domain/models/errors/SecretNotFoundInRepositoriesError';
import { SecretRetriever } from '../../../../../src/domain/port/in/SecretRetriever';

describe('Secret By Id Test', () => {
  it('should throw an error when sending an invalid url', () => {
    // Arrange
    const next: NextFunction = jest.fn();
    const req: Request = expect.any(request);
    const res: Response = expect.any(response);

    const secretRetriever: SecretRetriever = {
      retrieveSecret: jest.fn(),
    };
    const secretByIdController = new SecretByIdController(secretRetriever);

    // Act
    secretByIdController.retrieveSecretByUrl(req, res, next);

    // Assert
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(new ValidationError('URL is not Valid'));
  });

  it('should throw an error when secret is not found', async () => {
    // Arrange
    const req: Request = expect.any(request);
    req.params = { urlId: '123456qwerty' };
    const res: Response = expect.any(response);
    const next: NextFunction = jest.fn();

    const secretRetriever: SecretRetriever = {
      retrieveSecret: jest.fn().mockImplementation(async () => {
        throw new SecretNotFoundInRepositoryError();
      }),
    };
    const secretByIdController = new SecretByIdController(secretRetriever);

    // Act
    await secretByIdController.retrieveSecretByUrl(req, res, next);

    // Assert
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(new SecretNotFoundInRepositoryError());
  });

  // Happy
  it('should return secret when it found', async () => {
    // Arrange
    const req: Request = expect.any(request);
    req.params = { urlId: '123456qwerty' };

    const res: Response = expect.any(response);
    res.json = jest.fn();
    res.status = jest.fn().mockReturnThis();

    const next: NextFunction = jest.fn();

    const secretRetriever: SecretRetriever = {
      retrieveSecret: jest.fn().mockResolvedValue({ secret: '123qwer' }),
    };
    const secretByIdController = new SecretByIdController(secretRetriever);

    // Act
    await secretByIdController.retrieveSecretByUrl(req, res, next);

    // Assert
    expect(next).toHaveBeenCalledTimes(0);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ secret: '123qwer' });
  });
});
