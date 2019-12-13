import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import 'mocha';

chai.use(sinonChai);
const expect = chai.expect;

import * as typeorm from 'typeorm';
import { ConnectionProvider, IConnectionProvider } from 'src/database';
import { mockConfig } from './mockConfig';
import { DatabaseError } from 'src/error';

describe('Database Connection Provider', () => {
  const sandbox = sinon.createSandbox();

  let provider: IConnectionProvider;
  let mockConnection: any;
  let createConnectionStub: sinon.SinonStub;

  beforeEach(() => {
    provider = new ConnectionProvider(mockConfig);
    mockConnection = sandbox.createStubInstance(typeorm.Connection);
  });

  afterEach(() => {
    delete provider['config'];
    sandbox.restore();
  });

  describe('connection success', () => {
    beforeEach(() => {
      createConnectionStub = sandbox.stub(typeorm, 'createConnection').resolves(mockConnection);
    });

    it('Should create a connection', async () => {
      const connection = await provider.getConnection();
      expect(createConnectionStub.calledOnce).to.be.true;
      expect(connection).to.be.equal(mockConnection);
    });

    it('Should return a saved connection when ran twice', async () => {
      const connection1 = await provider.getConnection();
      const connection2 = await provider.getConnection();
      expect(createConnectionStub.calledOnce).to.be.true;
      expect(connection1).to.be.equal(connection2);
    });
  });

  describe('connection failure', () => {
    beforeEach(() => {
      createConnectionStub = sandbox.stub(typeorm, 'createConnection').rejects(mockConnection);
    });

    it('Should throw a DatabaseError', async () => {
      try {
        await provider.getConnection();
      } catch (error) {
        expect(error).to.be.instanceOf(DatabaseError);
      }
    });
  });
});
