import LogLevel, { LogLevels } from "./level";

export const logInfo = message => {
  if (LogLevel >= LogLevels.INFO) console.info(message);
};

export const logError = message => {
  if (LogLevel >= LogLevels.ERROR) console.error(message);
};

export const logDebug = message => {
  if (LogLevel >= LogLevels.DEBUG) console.log(message);
};

export default logInfo;
