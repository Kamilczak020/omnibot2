import { LogLevel } from './logLevel';
import { format as formatDate } from 'date-fns';

export interface ILogger {
  info(message: string): void;
  debug(message: string): void;
  warn(message: string): void;
  error(message: string): void;
}

interface MessageOptions {
  format?: string;
  level?: LogLevel;
}

interface LoggerOptions {
  format?: string;
  transport?: NodeJS.WritableStream;
}

/**
 * Class representing a logger utility, facilitating the creation
 * of log messages into any type of WritableStream.
 * Supports different kinds of formatting.
 */
export class Logger implements ILogger {
  private loggerOptions: LoggerOptions;

  public constructor(options?: LoggerOptions) {
    const defaultOptions = {
      format: '[{level}] [{timestamp}] | {message}',
      transport: process.stdout,
    };

    this.loggerOptions = { ...defaultOptions, ...options };
  }

  /**
   * Writes a log message of level type INFO
   * @param message message to log
   * @param format logging format
   */
  public info(message: string, format?: string) {
    this.logMessage(message, { ...this.loggerOptions, format, level: LogLevel.Info });
  }

  /**
   * Writes a log message of level type DEBUG
   * @param message message to log
   * @param format logging format
   */
  public debug(message: string, format?: string) {
    this.logMessage(message, { ...this.loggerOptions, format, level: LogLevel.Debug });
  }

  /**
   * Writes a log message of level type WARNING
   * @param message message to log
   * @param format logging format
   */
  public warn(message: string, format?: string) {
    this.logMessage(message, { ...this.loggerOptions, format, level: LogLevel.Warning });
  }

  /**
   * Writes a log message of level type ERROR
   * @param message message to log
   * @param format logging format
   */
  public error(message: string, format?: string) {
    this.logMessage(message, { ...this.loggerOptions, format, level: LogLevel.Error });
  }

  /**
   * Updates the default logger options.
   * @param options new logger options
   */
  public setDefaultOptions(options: LoggerOptions) {
    this.loggerOptions = { ...this.loggerOptions, ...options };
  }

  /**
   * Formats a message given a message string and message options.
   * Supports multiple keywords, like: {level}, {timestamp}, {message}
   * @param message message to format
   * @param options message options
   */
  private formatMessage(message: string, options: MessageOptions & LoggerOptions) {
    const formattedMessage = options.format
      .replace('{level}', options.level)
      .replace('{timestamp}', formatDate(Date.now(), 'yyyy-MM-dd HH:mm:ss'))
      .replace('{message}', message);

    return formattedMessage;
  }

  /**
   * Actually logs the message to the correct transport, given options.
   * @param message message to log
   * @param options message options
   */
  private logMessage(message: string, options: MessageOptions & LoggerOptions) {
    const parsedMessage = this.formatMessage(message, options);
    options.transport.write(parsedMessage);
  }
}
