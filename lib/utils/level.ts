export enum LogLevel {
  Debug = 0,
  Info = 1,
  Warning = 2,
  Error = 3,
  Critical = 4,
}

export namespace LogLevel {
  const levelMap: { [key in LogLevel]: string } = {
    [LogLevel.Debug]: "DEBUG",
    [LogLevel.Info]: "INFO",
    [LogLevel.Warning]: "WARNING",
    [LogLevel.Error]: "ERROR",
    [LogLevel.Critical]: "CRITICAL",
  };

  export function toString(level: LogLevel): string {
    if (level in levelMap) {
      return levelMap[level];
    }
    throw new Error(`Unsupported log level ${level}`);
  }
}
