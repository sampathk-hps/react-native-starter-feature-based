import { EnvironmentConfig } from '../../../environment.config';

export namespace LoggerConfiguration {
  export const enableLogs: boolean = EnvironmentConfig.enableLogs;
  export const showApiRequestLogs: boolean = true;
  export const showApiResponseLogs: boolean = true;
}

if (!LoggerConfiguration.enableLogs) {
  console.log = () => {};
  console.error = () => {};
  console.warn = () => {};
  console.info = () => {};
}
// To override - if necessary
//  else {
//   const originalLog = console.log;
//   console.log = (...args) => {
//     originalLog('[LOG]:', ...args);
//   };
// }
