import { ISplitParserConfig } from 'src/config/parser';

export const splitWithoutSkipConfig: ISplitParserConfig = {
  name: 'SplitParser',
  behavior: {
    separator: ' ',
    skip: 0,
  },
};

export const splitWithSkipConfig: ISplitParserConfig = {
  name: 'SplitParser',
  behavior: {
    separator: ' ',
    skip: 3,
  },
};
