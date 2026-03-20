import { format, isValid, differenceInCalendarDays, parseISO } from 'date-fns';

export namespace DateTimeUtils {
  export const readDateFormat = 'd MMMM, yyyy';

  export const formatDate = (
    date: Date | string,
    formatStr: string = readDateFormat,
  ): string => {
    const d = typeof date === 'string' ? parseISO(date) : date;
    return isValid(d) ? format(d, formatStr) : '';
  };

  export const isValidDate = (date: Date | string): boolean => {
    const d = typeof date === 'string' ? parseISO(date) : date;
    return isValid(d);
  };

  export const getDaysDifference = (
    a: Date | string,
    b: Date | string,
  ): number => {
    const da = typeof a === 'string' ? parseISO(a) : a;
    const db = typeof b === 'string' ? parseISO(b) : b;
    return Math.abs(differenceInCalendarDays(da, db));
  };
}
