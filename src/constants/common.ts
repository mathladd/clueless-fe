export enum EUnitValue {
  NO_UNIT = 1,
  K = 1e3,
  M = 1e6,
  B = 1e9,
  T = 1e12,
  P = 1e15,
  E = 1e18,
}

export const DEFAULT_BIG_NUMBER_FORMAT = {
  decimalSeparator: '.',
  groupSeparator: ',',
  prefix: '',
  groupSize: 3,
  secondaryGroupSize: 0,
  fractionGroupSeparator: ' ',
  fractionGroupSize: 0,
  suffix: '',
};

export const DEFAULT_LOCALE = 'en';

export const DEFAULT_LIMIT = 10;

export const FIRST_PAGE = 1;

export const APP_NAME = 'My App';
