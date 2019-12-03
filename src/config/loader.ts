import * as t from 'io-ts';
import { isRight } from 'fp-ts/lib/Either';
import { readFileSync, existsSync } from 'fs';
import { ConfigurationError, NotFoundError } from 'src/error';
import { DEFAULT_SAFE_SCHEMA, safeLoad, Schema } from 'js-yaml';
import { regexpType } from './regexp';

export const CONFIG_SCHEMA = Schema.create([DEFAULT_SAFE_SCHEMA], [
  regexpType,
]);

export function loadConfig<T>(codec: t.Type<T>, path: string): T {
  const fileData = readFileSync(path, 'utf8');
  if (!existsSync(path)) {
    throw new NotFoundError('Cannot find configuration file to load.');
  }

  const data = safeLoad(fileData, { schema: CONFIG_SCHEMA });
  const result = codec.decode(data);

  if (isRight(result)) {
    return result.right;
  } else {
    throw new ConfigurationError('Configuration schema does not match.');
  }
}
