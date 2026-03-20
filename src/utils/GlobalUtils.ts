/* eslint-disable no-var */

declare global {
  var currentLanguageCode: string;
}

export namespace GlobalUtils {
  export function setCurrentLanguageCode(value: string): void {
    globalThis.currentLanguageCode = value;
  }

  export function getCurrentLanguageCode(): string {
    return globalThis.currentLanguageCode;
  }
}
