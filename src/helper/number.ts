import BigNumber from 'bignumber.js';
import { EUnitValue } from 'constants/common';

export const toStandardFormat = (value: string | number) => `${value}`.replace(/[,]/g, '');

export const toBigNumber = (value: string | number) => new BigNumber(toStandardFormat(value));

export const formatNumberWith = (value: string | number, symbol = ',') => {
  const valueBigNumber = new BigNumber(value);
  if (valueBigNumber.isNaN()) return '';

  return valueBigNumber.toFormat({
    groupSeparator: symbol,
    groupSize: 3,
  });
};

export const nFormatter = (num: number, digits: number, min = 1) => {
  // 1e3 => 10^3
  const lookup = [
    { value: EUnitValue.NO_UNIT, symbol: '' },
    { value: EUnitValue.K, symbol: 'K' },
    { value: EUnitValue.M, symbol: 'M' },
    { value: EUnitValue.B, symbol: 'B' },
    { value: EUnitValue.T, symbol: 'T' },
    { value: EUnitValue.P, symbol: 'P' },
    { value: EUnitValue.E, symbol: 'E' },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup
    .filter(({ value }) => value >= min)
    .slice()
    .reverse()
    .find(({ value }) => num >= value);
  return item ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol : `${num || 0}`;
};

export const getNumZeroPadding = (num: number | string | undefined) => String(num).padStart(2, '0');
