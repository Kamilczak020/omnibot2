import { BaseError } from 'make-error-cause';

export class ConfigurationError extends BaseError {
  public constructor(message = 'Incorrect configuration file.', cause?: BaseError) {
    super(message, cause);

    this.name = 'ConfigurationError';
  }
}
