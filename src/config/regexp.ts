import { Type as YamlType } from 'js-yaml';
import { isNil } from 'lodash';

import { InvalidArgumentError } from 'src/error';

export const REGEXP_REGEXP = /\/(.*)\/([gimuy]*)/;

export const regexpType = new YamlType('!regexp', {
  kind: 'scalar',
  resolve(value: string) {
    return REGEXP_REGEXP.test(value);
  },
  construct(value: string): RegExp {
    const match = REGEXP_REGEXP.exec(value);
    if (isNil(match)) {
      throw new InvalidArgumentError('invalid regexp');
    }
    const [/* input */, expr, flags] = Array.from(match);
    return new RegExp(expr, flags);
  },
});
