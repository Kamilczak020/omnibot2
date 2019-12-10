import { Type as YamlType } from 'js-yaml';

import { InvalidArgumentError } from 'src/error';

export const REGEXP_REGEXP = /\/(.*)\/([gimuy]*)/;

export const regexpType = new YamlType('!regexp', {
  kind: 'scalar',
  resolve(value: string) {
    return REGEXP_REGEXP.test(value);
  },
  construct(value: string): RegExp {
    try {
      const match = REGEXP_REGEXP.exec(value);
      const [/* input */, expr, flags] = Array.from(match);
      return new RegExp(expr, flags);
    } catch (error) {
      throw new InvalidArgumentError('Invalid regexp');
    }
  },
});
