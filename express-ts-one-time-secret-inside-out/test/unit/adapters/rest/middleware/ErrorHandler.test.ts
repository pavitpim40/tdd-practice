import { NextFunction, request, Request, response, Response } from 'express';
import { errorHandler } from '../../../../../src/adapters/rest/middleware/ErrorHandler';
import { ValidationError } from '../../../../../src/adapters/rest/controllers/ValidationError';
import { UrlIdTooShortError } from '../../../../../src/domain/models/errors/UrlIdTooShortError';
import { SecretTooShortError } from '../../../../../src/domain/models/errors/SecretTooShortError';
import { SecretNotFoundInRepositoryError } from '../../../../../src/domain/models/errors/SecretNotFoundInRepositoriesError';

describe('ErrorHandler Test', () => {
  it('should send a uncontrolled error', () => {
    const req: Request = expect.any(request);
    req.body = { secret: '123qwe' };
    const res: Response = expect.any(response);
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    const next: NextFunction = jest.fn();
    const error = new Error('Something went wrong');

    // Act
    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      title: 'InternalSeverError',
      message: 'Something went wrong',
    });
  });

  it('should send a validation error', () => {
    const req: Request = expect.any(request);
    req.body = { secret: '123qwe' };
    const res: Response = expect.any(response);
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    const next: NextFunction = jest.fn();
    const error = new ValidationError('body is not present');

    // Act
    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      title: 'ValidationError',
      message: 'body is not present',
    });
  });

  it('should send a UrlId too short error', () => {
    const req: Request = expect.any(request);
    req.body = { secret: '123qwe' };
    const res: Response = expect.any(response);
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    const next: NextFunction = jest.fn();
    const error = new UrlIdTooShortError();

    // Act
    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      title: 'UrlIdTooShortError',
      message: error.message,
    });
  });

  it('should send a Secret too short error', () => {
    const req: Request = expect.any(request);
    req.body = { secret: '123qwe' };
    const res: Response = expect.any(response);
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    const next: NextFunction = jest.fn();
    const error = new SecretTooShortError();

    // Act
    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      title: 'SecretTooShortError',
      message: 'Secret is too short',
    });
  });

  it('should send a Secret too short error', () => {
    const req: Request = expect.any(request);
    req.body = { secret: '123qwe' };
    const res: Response = expect.any(response);
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    const next: NextFunction = jest.fn();
    const error = new SecretNotFoundInRepositoryError();

    // Act
    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      title: error.name,
      message: error.message,
    });
  });
});
