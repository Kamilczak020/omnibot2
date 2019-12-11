import { IMatcherConfig } from 'src/config/models';

export const regexpAnyConfig: IMatcherConfig = {
  name: 'regexpAnyMatcher',
  rules: [{
    test: /foo/,
    strategy: 'any',
    context: {
      handler: 'anyRegexpHandler',
      parser: 'anyRegexpParser',
    },
  }],
};

export const regexpFirstWordConfig: IMatcherConfig = {
  name: 'regexpFirstWordMatcher',
  rules: [{
    test: /bar/,
    strategy: 'first-word',
    context: {
      handler: 'firstWordRegexpHandler',
      parser: 'firstWordRegexpParser',
    },
  }],
};

export const stringAnyConfig: IMatcherConfig = {
  name: 'stringAnyMatcher',
  rules: [{
    test: 'boo',
    strategy: 'any',
    context: {
      handler: 'anyStringHandler',
      parser: 'anyStringParser',
    },
  }],
};

export const stringFirstWordConfig: IMatcherConfig = {
  name: 'stringAnyMatcher',
  rules: [{
    test: 'far',
    strategy: 'first-word',
    context: {
      handler: 'firstWordStringHandler',
      parser: 'firstWordStringParser',
    },
  }],
};

export const config: IMatcherConfig = {
  name: 'mockMatcher',
  rules: [{
    test: /foo/,
    strategy: 'any',
    context: {
      handler: 'anyRegexpHandler',
      parser: 'anyRegexpParser',
    },
  }, {
    test: /bar/,
    strategy: 'first-word',
    context: {
      handler: 'firstWordRegexpHandler',
      parser: 'firstWordRegexpParser',
    },
  }, {
    test: 'foo',
    strategy: 'any',
    context: {
      handler: 'anyStringHandler',
      parser: 'anyStringParser',
    },
  }, {
    test: 'foo',
    strategy: 'first-word',
    context: {
      handler: 'firstWordStringHandler',
      parser: 'firstWordStringParser',
    },
  }],
};
