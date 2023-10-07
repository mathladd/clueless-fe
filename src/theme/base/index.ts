import { extendTheme } from '@chakra-ui/react';
import { colors } from './colors';
import breakPoints from './breakpoints';

interface BaseTheme {
  colors: {
    [x in string]: {
      [y in string]: string;
    };
  };
}

export const baseTheme = extendTheme({
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
  colors: { ...colors },
  breakpoints: breakPoints,
}) as BaseTheme;

export default baseTheme;
