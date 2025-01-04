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

  async #log(message: string, logLevel: LogLevel): Promise<void> {
    if (logLevel < this.#config.level || !this.#fileHandler) {
      return;
    }
    const date_iso = new Date().toISOString();
    const log_level_string = LogLevel.toString(logLevel);
    const logMessage = `[${date_iso}] [${log_level_string}]: ${getCallerInfo()} ${message}\n`;
    await this.#fileHandler.write(logMessage);
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
