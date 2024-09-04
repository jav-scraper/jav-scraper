import pino from "pino";

export const logger = pino({
  // levelComparison: "DESC",
  level: "info",
});
