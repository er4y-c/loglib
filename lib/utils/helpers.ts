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
