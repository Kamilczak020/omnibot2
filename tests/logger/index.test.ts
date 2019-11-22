import { Logger } from 'src/logger';
import { expect } from 'chai';
import 'mocha';

describe('Logger', () => {
  const loggerWithoutPassedOptions = new Logger();
  it('Should have default options, with format and transport properties', () => {
    expect(loggerWithoutPassedOptions['loggerOptions'] == undefined).to.not.equal(undefined);
    expect(loggerWithoutPassedOptions).to.have.nested.property('loggerOptions.format');
    expect(loggerWithoutPassedOptions).to.have.nested.property('loggerOptions.transport');
  });

});
