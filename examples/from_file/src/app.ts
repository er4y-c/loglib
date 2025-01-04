import { Logger, LogConfig } from "../../../lib/index.js";

async function initiliaze_logger() {
  // Load config from file
  const logConfig = LogConfig.fromConfigFile("./config.json");

  // Create logger with config
  const logger = new Logger(logConfig);
  await logger.init();
  return logger;
}

async function main() {
  const logger = await initiliaze_logger();
  logger.debug("Debug message");
  logger.info("Info message");
  logger.warning("Warning message");
}

main();
