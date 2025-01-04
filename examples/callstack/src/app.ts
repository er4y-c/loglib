/* import { Logger, LogConfig } from "../../../lib/index.js";

async function initiliaze_logger() {
  // Load config from file
  const logConfig = LogConfig.fromConfigFile("./config.json");

  // Create logger with config
  const logger = new Logger(logConfig);
  await logger.init();
  return logger;
}

function super_nested(logger: Logger) {
  logger.critical('From the super_nested() function');
}

function nested_func(logger: Logger) {
  logger.critical('From the nested_func() function');
  super_nested(logger);
}

async function main() {
  const logger = await initiliaze_logger();
  logger.critical('From the main() function');
  nested_func(logger);
}

main();
*/
