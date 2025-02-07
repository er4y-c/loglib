# loglib

`loglib` is a simple and flexible logging library for Node.js applications. It supports various log levels, rolling log files based on size and time, and easy configuration.

## Features

- Multiple log levels: Debug, Info, Warning, Error, Critical
- Rolling log files based on size and time
- Easy configuration via JSON or programmatically
- Customizable log configs

## Installation

```bash
npm install loglib
```

## Usage

### Basic Usage

```typescript
import { Logger, LogConfig, LogLevel } from "loglib";

const logger = new Logger();
await logger.init();

logger.debug("This is a debug message");
logger.info("This is an info message");
logger.warning("This is a warning message");
logger.error("This is an error message");
logger.critical("This is a critical message");
```

### Custom Configuration

```typescript
import {
  Logger,
  LogConfig,
  LogLevel,
  RollingSizeOptions,
  RollingTimeOptions,
} from "loglib";

const logConfig = new LogConfig()
  .withLogLevel(LogLevel.Info)
  .withFilePrefix("MyAppLog_")
  .withRollingConfig({
    sizeThreshold: RollingSizeOptions.TenMB,
    timeThreshold: RollingTimeOptions.Daily,
  });

const logger = new Logger(logConfig);
await logger.init();

logger.info("This is an info message with custom configuration");
```

### Configuration from JSON File

```typescript
import { Logger, LogConfig } from "loglib";

const logConfig = LogConfig.fromConfigFile("path/to/config.json");
const logger = new Logger(logConfig);
await logger.init();

logger.info("This is an info message with configuration from JSON file");
```

## Configuration Options

### Log Levels

- `LogLevel.Debug`
- `LogLevel.Info`
- `LogLevel.Warning`
- `LogLevel.Error`
- `LogLevel.Critical`

### Rolling Options

#### Size Options

- `RollingSizeOptions.OneKB`
- `RollingSizeOptions.FiveKB`
- `RollingSizeOptions.TenKB`
- `RollingSizeOptions.TwentyKB`
- `RollingSizeOptions.FiftyKB`
- `RollingSizeOptions.HundredKB`
- `RollingSizeOptions.HalfMB`
- `RollingSizeOptions.OneMB`
- `RollingSizeOptions.FiveMB`
- `RollingSizeOptions.TenMB`
- `RollingSizeOptions.TwentyMB`
- `RollingSizeOptions.FiftyMB`
- `RollingSizeOptions.HundredMB`

#### Time Options

- `RollingTimeOptions.Minutely`
- `RollingTimeOptions.Hourly`
- `RollingTimeOptions.Daily`
- `RollingTimeOptions.Weekly`
- `RollingTimeOptions.Monthly`
- `RollingTimeOptions.Yearly`

## License

This project is licensed under the MIT License.
