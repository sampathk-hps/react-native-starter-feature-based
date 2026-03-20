import { logger as rnLogger, consoleTransport } from 'react-native-logs';
import { EnvironmentConfig } from '../../../environment.config';

const config = {
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  },
  severity: __DEV__ ? 'debug' : 'warn',
  transport: consoleTransport,
  transportOptions: {
    colors: {
      debug: 'white',
      info: 'blueBright',
      warn: 'yellowBright',
      error: 'redBright',
    },
  },
  async: true,
  dateFormat: 'time',
  printDate: true,
  printLevel: true,
  enabled: EnvironmentConfig.enableLogs,
} as const;

export const logger = rnLogger.createLogger(config);
