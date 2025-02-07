/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, jest, test } from "@jest/globals";
import fs from "fs/promises";

import { Logger, LogConfig, LogLevel } from "../lib";

// Properly mock fs/promises
jest.mock("fs/promises");
jest.mock("path");

describe("Logger", () => {
  let logger: Logger;
  let logConfig: LogConfig;

  beforeEach(async () => {
    // Create a fresh LogConfig for each test
    logConfig = LogConfig.withDefaults();
    logger = new Logger(logConfig);
    await logger.init();
  });

  afterEach(() => {
    // Clear all mocks after each test
    jest.clearAllMocks();
  });

  test("should initialize logger with default config", () => {
    expect(logger.level).toBe(LogLevel.Debug);
    expect(logger.file_prefix).toBe("Loglib_");
  });

  test("should write debug log when log level allows", async () => {
    // Mock write method on FileHandle
    const writeMock = jest.spyOn(fs, "writeFile").mockResolvedValue(undefined);

    await logger.debug("Debug message");

    expect(writeMock).toHaveBeenCalled();
    writeMock.mockRestore();
  });

  test("should write info log", async () => {
    const writeMock = jest.spyOn(fs, "writeFile").mockResolvedValue(undefined);

    await logger.info("Info message");

    expect(writeMock).toHaveBeenCalled();
    writeMock.mockRestore();
  });

  test("should write warning log", async () => {
    const writeMock = jest.spyOn(fs, "writeFile").mockResolvedValue(undefined);

    await logger.warning("Warning message");

    expect(writeMock).toHaveBeenCalled();
    writeMock.mockRestore();
  });

  test("should write error log", async () => {
    const writeMock = jest.spyOn(fs, "writeFile").mockResolvedValue(undefined);

    await logger.error("Error message");

    expect(writeMock).toHaveBeenCalled();
    writeMock.mockRestore();
  });

  test("should write critical log", async () => {
    const writeMock = jest.spyOn(fs, "writeFile").mockResolvedValue(undefined);

    await logger.critical("Critical message");

    expect(writeMock).toHaveBeenCalled();
    writeMock.mockRestore();
  });

  it("should not write log if log level is lower than config level", async () => {
    // Set log level to Error
    logConfig.withLogLevel(LogLevel.Error);
    logger = new Logger(logConfig);
    await logger.init();

    const writeMock = jest.spyOn(fs, "writeFile").mockResolvedValue(undefined);

    await logger.debug("Debug message");

    expect(writeMock).not.toHaveBeenCalled();
    writeMock.mockRestore();
  });

  test("should roll log file based on size", () => {
    // Mock stat to return a file size exceeding threshold
    jest.spyOn(fs, "stat").mockResolvedValue({
      size: logConfig.rollingConfig.sizeThreshold + 1,
      birthtimeMs: new Date().getTime(),
    } as any);

    // Mock necessary methods
    const initMock = jest.spyOn(logger, "init").mockResolvedValue();

    logger.info("Info message");

    expect(initMock).toHaveBeenCalled();

    initMock.mockRestore();
  });

  it("should roll log file based on time", () => {
    // Mock stat to return a file time exceeding threshold
    jest.spyOn(fs, "stat").mockResolvedValue({
      size: 0,
      birthtimeMs:
        new Date().getTime() - logConfig.rollingConfig.timeThreshold * 1000 - 1,
    } as any);

    // Mock necessary methods
    const initMock = jest.spyOn(logger, "init").mockResolvedValue();

    logger.info("Info message");

    expect(initMock).toHaveBeenCalled();

    initMock.mockRestore();
  });
});
