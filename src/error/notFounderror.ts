import { BaseError } from 'make-error-cause';

export class NotFoundError extends BaseError {
  public constructor(message = 'Value not found.', cause?: BaseError) {
    super(message, cause);

    this.name = 'NotFoundError';
  }
}
