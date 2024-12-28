import { Logger, LogConfig } from "../../lib";

// Load config from file
const logConfig = LogConfig.fromConfigFile("examples/from_file/config.json");

// Create logger with config
const logger = new Logger(logConfig);
