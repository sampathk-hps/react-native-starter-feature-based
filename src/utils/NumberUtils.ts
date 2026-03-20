import { Configuration } from '../core/configuration/Configuration';

export namespace NumberUtils {
  export const formatDecimal = (
    value: number,
    places: number = Configuration.defaultDecimalPlaces,
  ): string => value.toFixed(places);

  export const parseNumber = (value: string): number | null => {
    const parsed = Number(value);
    return isNaN(parsed) || !isFinite(parsed) ? null : parsed;
  };
}
