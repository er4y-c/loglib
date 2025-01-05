import { Logger, LogConfig } from "../../../lib/index.js";

async function init() {
  const logger = Logger.withConfig(LogConfig.fromConfigFile("config.json"));
  await logger.init();
  return logger;
}

async function main() {
  const logger = await init();
  logger.error("Hello World!\n");
}

main();
