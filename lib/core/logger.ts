import { LogConfig } from "./config";

export class Logger {
  #config: LogConfig;
  
  constructor(logConfig?: LogConfig) {
    this.#config = logConfig || LogConfig.withDefaults();
  }

  static withConfig(logConfig: LogConfig) {
    return new Logger(logConfig);
  }
}