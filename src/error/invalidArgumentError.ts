import { BaseError } from 'make-error-cause';

export class InvalidArgumentError extends BaseError {
  public constructor(message: string, cause?: BaseError) {
    super(message, cause);

    this.name = 'InvalidArgumentError';
  }
}
