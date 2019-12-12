import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import 'mocha';

chai.use(sinonChai);
const expect = chai.expect;

import { MessageEntity, MessageDTO } from 'src/entity';

describe('Message Entity', () => {
  it('Should construct a message entity object with properties undefined by default', () => {
    const entity = new MessageEntity();
    expect(entity.id).to.be.equal(undefined);
    expect(entity.messageId).to.be.equal(undefined);
    expect(entity.body).to.be.equal(undefined);
    expect(entity.author).to.be.equal(undefined);
    expect(entity.channel).to.be.equal(undefined);
    expect(entity.guild).to.be.equal(undefined);
    expect(entity.timestamp).to.be.equal(undefined);
  });

  it('Should accept props in constructor and set properties accordingly', () => {
    const timestamp = new Date();
    const dto: MessageDTO = {
      id: '1',
      messageId: '1',
      body: 'test',
      author: 'test',
      channel: 'test',
      guild: 'test',
      timestamp,
    };

    const entity = new MessageEntity(dto);
    expect(entity.id).to.be.equal('1');
    expect(entity.messageId).to.be.equal('1');
    expect(entity.body).to.be.equal('test');
    expect(entity.author).to.be.equal('test');
    expect(entity.channel).to.be.equal('test');
    expect(entity.guild).to.be.equal('test');
    expect(entity.timestamp).to.be.equal(timestamp);
  });
});
