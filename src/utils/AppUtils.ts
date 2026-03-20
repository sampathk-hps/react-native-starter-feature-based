export namespace AppUtils {
  export const delay = (ms: number) =>
    new Promise<void>(resolve => setTimeout(resolve, ms));

  export const removeKey = <T extends object, K extends keyof T>(
    obj: T,
    key: K,
  ): Omit<T, K> => {
    const { [key]: _, ...rest } = obj;
    return rest;
  };
}
