import { IMatcherConfig } from 'src/config/models';

export const regexpAnyConfig: IMatcherConfig = {
  name: 'regexpAnyMatcher',
  rules: [{
    tests: [/foo/],
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
    tests: [/bar/],
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
    tests: ['boo'],
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
    tests: ['far'],
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
    tests: [/foo/],
    strategy: 'any',
    context: {
      handler: 'anyRegexpHandler',
      parser: 'anyRegexpParser',
    },
  }, {
    tests: [/bar/],
    strategy: 'first-word',
    context: {
      handler: 'firstWordRegexpHandler',
      parser: 'firstWordRegexpParser',
    },
  }, {
    tests: ['foo'],
    strategy: 'any',
    context: {
      handler: 'anyStringHandler',
      parser: 'anyStringParser',
    },
  }, {
    tests: ['foo'],
    strategy: 'first-word',
    context: {
      handler: 'firstWordStringHandler',
      parser: 'firstWordStringParser',
    },
  }],
};
