import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import 'mocha';
import 'reflect-metadata';

chai.use(sinonChai);
const expect = chai.expect;

import { ClientController, IClientController } from 'src/client';
import { ILogger, Logger } from 'src/logger';
import { DiscordClientError } from 'src/error';

describe('Discord Client Controller', () => {
  const sandbox = sinon.createSandbox();

  let controller: IClientController;
  let logger: ILogger;
  let client: sinon.SinonStubbedInstance<any>;

  let loginMock: sinon.SinonStub;
  let setPresenceMock: sinon.SinonStub;
  let onMock: sinon.SinonStub;
  let removeAllListenersMock: sinon.SinonStub;
  let destroyMock: sinon.SinonStub;

  describe('Success', () => {
    beforeEach(() => {
      logger = sandbox.createStubInstance(Logger);

      client = sandbox.stub();
      client.login = sandbox.stub();
      client.on = sandbox.stub();
      client.removeAllListeners = sandbox.stub();
      client.destroy = sandbox.stub();
      client.user = sandbox.stub();
      client.user.setPresence = sandbox.stub();

      loginMock = client.login.resolves();
      setPresenceMock = client.user.setPresence.resolves();
      onMock = client.on;
      removeAllListenersMock = client.removeAllListeners;
      destroyMock = client.destroy.resolves();

      controller = new ClientController(client as any, logger);
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('login() should attempt to login the bot with the token', async () => {
      await controller.login('TOKEN');
      expect(loginMock.calledOnceWith('TOKEN')).to.be.true;
    });

    it('setPresence() should attempt to set user presence with presence data', async () => {
      await controller.setPresence({ game: { name: '!listcommands' }, status: 'online' });
      expect(setPresenceMock.calledOnceWith({ game: { name: '!listcommands' }, status: 'online' })).to.be.true;
    });

    it('attachHandler() should attempt to attach an event handler to a correct event', async () => {
      const func = () => true;
      controller.attachHandler('test', func);
      expect(onMock.calledOnceWith('test', func)).to.be.true;
    });

    it('destroy() should attempt to destroy client service', async () => {
      await controller.destroy();
      expect(destroyMock.calledOnce).to.be.true;
    });

    describe('RemoveAllListeners()', () => {
      it('removeAllListeners() should remove one listener', async () => {
        controller.removeAllListeners(['test']);
        expect(removeAllListenersMock.calledOnceWith('test')).to.be.true;
      });

      it('removeAllListeners() should remove multiple listeners', async () => {
        controller.removeAllListeners(['test1', 'test2']);
        expect(removeAllListenersMock.calledTwice).to.be.true;
        expect(removeAllListenersMock.calledWith('test1')).to.be.true;
        expect(removeAllListenersMock.calledWith('test2')).to.be.true;
      });
    });
  });

  describe('Failure', () => {
    beforeEach(() => {
      logger = sandbox.createStubInstance(Logger);

      client = sandbox.stub();
      client.login = sandbox.stub();
      client.on = sandbox.stub();
      client.removeAllListeners = sandbox.stub();
      client.destroy = sandbox.stub();
      client.user = sandbox.stub();
      client.user.setPresence = sandbox.stub();

      loginMock = client.login.rejects();
      setPresenceMock = client.user.setPresence.rejects();
      onMock = client.on;
      removeAllListenersMock = client.removeAllListeners;
      destroyMock = client.destroy.rejects();

      controller = new ClientController(client as any, logger);
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('login() should throw a DiscordClientError', async () => {
      try {
        await controller.login('TOKEN');
      } catch (error) {
        expect(error).to.be.instanceOf(DiscordClientError);
      }
    });

    it('setPresence() should throw a DiscordClientError', async () => {
      try {
        await controller.setPresence({ game: { name: '!listcommands' }, status: 'online' });
      } catch (error) {
        expect(error).to.be.instanceOf(DiscordClientError);
      }
    });

    it('destroy() should throw a DiscordClientError', async () => {
      try {
        await controller.destroy();
      } catch (error) {
        expect(error).to.be.instanceOf(DiscordClientError);
      }
    });
  });
});
