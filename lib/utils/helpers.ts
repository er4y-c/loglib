import fs from "fs";
import path from "path";

export function directoryChecker(pathDir: string): string {
  const mainPath = require.main ? require.main.path : process.cwd();
  const logDir = path.resolve(mainPath, pathDir);
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  return logDir;
}

export function getCallerInfo(): string {
  const stack = new Error().stack;
  if (!stack) {
    return "";
  }
  const stackLines = stack.split("\n");
  if (stackLines.length < 6) {
    return "";
  }
  const callInfo = stackLines[5].trim();
  return callInfo;
}
