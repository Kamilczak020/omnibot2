import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import 'mocha';

chai.use(sinonChai);
const expect = chai.expect;

import { MockHandler } from './mockHandler';
import { mockConfig } from './mockConfig';

describe('Base Handler', () => {
  const baseHandler = new MockHandler(mockConfig);

  it('getName() method should return filter name', () => {
    const name = baseHandler.getName();
    expect(name).to.be.equal('MockHandler');
  });
});
