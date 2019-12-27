export const REPOSITORY_IDENTIFIER = {
  TypeOrmMessageRepository: Symbol.for('TypeOrmMessageRepository'),
  TypeOrmFilteredRepository: Symbol.for('TypeOrmFilteredMessageRepository'),
  TypeOrmMatchedRepository: Symbol.for('TypeOrmMatchedRepository'),
  TypeOrmParsedRepository: Symbol.for('TypeOrmParsedRepository'),
  TypeOrmHandledRepository: Symbol.for('TypeOrmHandledRepository'),
  IMessageRepository: Symbol.for('IMessageRepository'),
  IFilteredRepository: Symbol.for('IFilteredMessageRepository'),
  IMatchedRepository: Symbol.for('IMatchedRepository'),
  IParsedRepository: Symbol.for('IParsedRepository'),
  IHandledRepository: Symbol.for('IHandledRepository'),
};
