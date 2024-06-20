type Level = "Info" | "Error" | "Warning" | "Debug";
export function writeJVLog(level: Level, message: string) {
  console.log(`[${level}] ${message}`);
}
