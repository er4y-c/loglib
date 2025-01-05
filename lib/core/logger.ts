import fs from "fs/promises";
import path from "path";

import { LogConfig } from "./config";
import { LogLevel } from "../utils/level";
import { directoryChecker, getCallerInfo } from "../utils/helpers";

export class Logger {
  #config: LogConfig;
  #fileHandler: fs.FileHandle | null = null;

  constructor(logConfig?: LogConfig) {
    this.#config = logConfig || LogConfig.withDefaults();
  }

  async init(): Promise<void> {
    // Initialize log file handler a d create log file directory if not exists
    const logDir = directoryChecker("logs");
    const filename = `${this.#config.filePrefix}${new Date()
      .toISOString()
      .replace(/[\.:]+/g, "_")}.log`;
    this.#fileHandler = await fs.open(path.join(logDir, filename), "a+");
  }

  static withConfig(logConfig: LogConfig): Logger {
    return new Logger(logConfig);
  }

  toJson(): LogConfig {
    return this.#config;
  }

  get level(): LogLevel {
    return this.#config.level;
  }

  get file_prefix(): string {
    return this.#config.filePrefix;
  }

  async #rollingCheck(): Promise<void> {
    if (!this.#fileHandler) {
      return;
    }
    const { sizeThreshold, timeThreshold } = this.#config.rollingConfig;

    const { size, birthtimeMs } = await this.#fileHandler.stat();
    const current_time = new Date().getTime();

    // If rolling is needed, close the current file and initialize a new file handler
    if (
      size >= sizeThreshold ||
      current_time - birthtimeMs >= timeThreshold * 1000
    ) {
      await this.#fileHandler.close();
      await this.init();
    }
  }

  async #logWriter(message: string, logLevel: LogLevel): Promise<void> {
    const date_iso = new Date().toISOString();
    const log_level_string = LogLevel.toString(logLevel);
    const logMessage = `[${date_iso}] [${log_level_string}]: ${getCallerInfo()} ${message}\n`;
    await this.#fileHandler?.write(logMessage);
  }

  async #log(message: string, logLevel: LogLevel): Promise<void> {
    // Check logging level
    if (logLevel < this.#config.level || !this.#fileHandler) {
      return;
    }
    // Write log message to file
    await this.#logWriter(message, logLevel);
    // Check if rolling is needed
    await this.#rollingCheck();
  }

  debug(message: string): void {
    this.#log(message, LogLevel.Debug);
  }

  info(message: string): void {
    this.#log(message, LogLevel.Info);
  }

  warning(message: string): void {
    this.#log(message, LogLevel.Warning);
  }

  error(message: string): void {
    this.#log(message, LogLevel.Error);
  }

  critical(message: string): void {
    this.#log(message, LogLevel.Critical);
  }
}
