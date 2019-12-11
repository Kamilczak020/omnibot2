import { BaseError } from 'make-error-cause';

export class ConfigurationError extends BaseError {
  public constructor(message: string, cause?: BaseError) {
    super(message, cause);

    this.name = 'ConfigurationError';
  }
}
