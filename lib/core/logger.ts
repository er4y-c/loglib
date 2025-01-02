import { LogConfig } from "./config";

export class Logger {
  #config: LogConfig;

  constructor(logConfig?: LogConfig) {
    this.#config = logConfig || LogConfig.withDefaults();
  }

  static withConfig(logConfig: LogConfig): Logger {
    return new Logger(logConfig);
  }

  toJson(): LogConfig {
    return this.#config;
  }
}
