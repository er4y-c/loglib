import * as fs from 'fs';

import { LogLevel } from "../utils/level";
import {
  RollingSizeOptions,
  RollingTimeOptions
} from "../utils/rolling";

import {
  RollingConfigProps,
  LogConfigProps
} from "../types";


export class RollingConfig {
  #timeThreshold = RollingTimeOptions.Daily;
  #sizeThreshold = RollingSizeOptions.FiveMB;

  static withDefaults() {
    return new RollingConfig();
  }

  withTimeThreshold(timeThreshold: number) {
    if (!Object.values(RollingTimeOptions).includes(timeThreshold)) {
      throw new Error("Invalid time threshold value");
    }
    this.#timeThreshold = timeThreshold;
    return this;
  }

  withSizeThreshold(sizeThreshold: number) {
    if (!Object.values(RollingSizeOptions).includes(sizeThreshold)) {
      throw new Error("Invalid size threshold value");
    }
    this.#sizeThreshold = sizeThreshold;
    return this;
  }

  static jsonToConfig(json: RollingConfigProps) {
    let config = new RollingConfig();
    Object.keys(json).forEach(key => {
      switch (key) {
        case 'timeThreshold':
          config.withTimeThreshold(json[key]);
          break;
        case 'sizeThreshold':
          config.withSizeThreshold(json[key]);
          break;
        default:
          break;
      }
    });
    return config;
  }
}

export class LogConfig {
  #level = LogLevel.Debug;
  #filePrefix = 'Loglib_';
  #rollingConfig = RollingConfig.withDefaults();

  get level() {
    return this.#level;
  }

  get rollingConfig() {
    return this.#rollingConfig;
  }

  get filePrefix() {
    return this.#filePrefix;
  }

  static withDefaults() {
    return new LogConfig();
  }

  withLogLevel(level: LogLevel) {
    if (!Object.values(LogLevel).includes(level)) {
      throw new Error("Invalid log level value");
    }
    this.#level = level;
    return this;
  }

  withFilePrefix(prefix: string) {
    this.#filePrefix = prefix;
    return this;
  }

  withRollingConfig(config: RollingConfigProps) {
    this.#rollingConfig = RollingConfig.jsonToConfig(config);
    return this;
  }

  static jsonToConfig(json: LogConfigProps) {
    let config = new LogConfig();
    Object.keys(json).forEach(key => {
      switch (key) {
        case 'level':
          config.withLogLevel(json[key]);
          break;
        case 'filePrefix':
          config.withFilePrefix(json[key]);
          break;
        case 'rollingConfig':
          config.withRollingConfig(json[key]);
          break;
        default:
          break;
      }
    });
    return config;
  }

  static fromConfigFile(filePath: string): LogConfig {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return LogConfig.jsonToConfig(JSON.parse(fileContent));
  }
}