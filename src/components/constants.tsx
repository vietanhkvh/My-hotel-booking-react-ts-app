export type some = { [key: string]: any };
export const ACCOUNTS = 'ACCOUNTS';
export const ANONYMOUS: string = 'ANONYMOUS';
export const SHORTCUTS: string = 'SHORTCUTS';
export const NORMAL_ACCOUNT: string = 'NORMAL_ACCOUNT';
export const SUCCESS_CODE = 200;

export const HOUR_MINUTE = 'HH:mm';
export const HOUR_MINUTE_SECOND = 'HH:mm:ss';
export const DATE_FORMAT = 'DD/MM/YYYY';
export const DATE_FORMAT_BACK_END = 'YYYY-MM-DD';
export const DATE_FORMAT_ALL = `${DATE_FORMAT} ${HOUR_MINUTE}`;
export const DATE_FORMAT_DETAIL = `${DATE_FORMAT_BACK_END} ${HOUR_MINUTE_SECOND}`;
export const DATE_FORMAT_HOUR_DAY = `${HOUR_MINUTE} ${DATE_FORMAT}`;
export const HOUR_MINUTE_CLOCK = 'HH:mm A';
