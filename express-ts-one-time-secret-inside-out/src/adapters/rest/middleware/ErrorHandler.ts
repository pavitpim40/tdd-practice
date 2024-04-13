import { NextFunction, Request, Response } from 'express';
import { ValidationError } from '../controllers/ValidationError';
import { UrlIdTooShortError } from '../../../domain/models/errors/UrlIdTooShortError';
import { SecretTooShortError } from '../../../domain/models/errors/SecretTooShortError';
import { SecretNotFoundInRepositoryError } from '../../../domain/models/errors/SecretNotFoundInRepositoriesError';

export function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (
    error instanceof ValidationError ||
    error instanceof UrlIdTooShortError ||
    error instanceof SecretTooShortError
  ) {
    return response.status(400).json({ title: error.name, message: error.message });
  } else if (error instanceof SecretNotFoundInRepositoryError) {
    return response.status(404).json({ title: error.name, message: error.message });
  } else {
    error.name = 'InternalSeverError';
  }
  response.status(500).json({ title: error.name, message: error.message });
}
