import * as fs from "fs";

import { LogLevel } from "../utils/level";
import { RollingSizeOptions, RollingTimeOptions } from "../utils/rolling";

import { RollingConfigProps, LogConfigProps } from "../types";

export class RollingConfig {
  #timeThreshold = RollingTimeOptions.Daily;
  #sizeThreshold = RollingSizeOptions.FiveMB;

  static withDefaults(): RollingConfig {
    return new RollingConfig();
  }

  withTimeThreshold(timeThreshold: number): RollingConfig {
    if (!Object.values(RollingTimeOptions).includes(timeThreshold)) {
      throw new Error("Invalid time threshold value");
    }
    this.#timeThreshold = timeThreshold;
    return this;
  }

  withSizeThreshold(sizeThreshold: number): RollingConfig {
    if (!Object.values(RollingSizeOptions).includes(sizeThreshold)) {
      throw new Error("Invalid size threshold value");
    }
    this.#sizeThreshold = sizeThreshold;
    return this;
  }

  static jsonToConfig(json: RollingConfigProps): RollingConfig {
    const config = new RollingConfig();
    Object.keys(json).forEach((key) => {
      switch (key) {
        case "timeThreshold":
          config.withTimeThreshold(json[key]);
          break;
        case "sizeThreshold":
          config.withSizeThreshold(json[key]);
          break;
        default:
          break;
      }
    });
    return config;
  }

  get timeThreshold(): number {
    return this.#timeThreshold;
  }

  get sizeThreshold(): number {
    return this.#sizeThreshold;
  }
}

export class LogConfig {
  #level = LogLevel.Debug;
  #filePrefix = "Loglib_";
  #rollingConfig = RollingConfig.withDefaults();

  get level(): LogLevel {
    return this.#level;
  }

  get rollingConfig(): RollingConfig {
    return this.#rollingConfig;
  }

  get filePrefix(): string {
    return this.#filePrefix;
  }

  static withDefaults(): LogConfig {
    return new LogConfig();
  }

  withLogLevel(level: LogLevel): LogConfig {
    if (!Object.values(LogLevel).includes(level)) {
      throw new Error("Invalid log level value");
    }
    this.#level = level;
    return this;
  }

  withFilePrefix(prefix: string): LogConfig {
    this.#filePrefix = prefix;
    return this;
  }

  withRollingConfig(config: RollingConfigProps): LogConfig {
    this.#rollingConfig = RollingConfig.jsonToConfig(config);
    return this;
  }

  static jsonToConfig(json: LogConfigProps): LogConfig {
    const config = new LogConfig();
    Object.keys(json).forEach((key) => {
      switch (key) {
        case "level":
          config.withLogLevel(json[key]);
          break;
        case "filePrefix":
          config.withFilePrefix(json[key]);
          break;
        case "rollingConfig":
          config.withRollingConfig(json[key]);
          break;
        default:
          break;
      }
    });
    return config;
  }

  static fromConfigFile(filePath: string): LogConfig {
    const fileContent = fs.readFileSync(filePath, "utf8");
    return LogConfig.jsonToConfig(JSON.parse(fileContent));
  }
}
