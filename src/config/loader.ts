import * as t from 'io-ts';
import { isRight } from 'fp-ts/lib/Either';
import { safeLoad } from 'js-yaml';
import { readFileSync } from 'fs';
import { ConfigurationError } from 'src/error';

export function loadConfig<T>(codec: t.Type<T>, path: string): T {
  try {
    const data = safeLoad(readFileSync(path, 'utf8'));
    const result = codec.decode(data);

    if (isRight(result)) {
      return result.right;
    } else {
      throw new ConfigurationError('Configuration schema does not match.');
    }
  } catch (error) {
    throw new ConfigurationError('Cannot load configuration file', error);
  }
}
