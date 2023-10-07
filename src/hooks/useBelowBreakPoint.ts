import { useMediaQuery } from '@chakra-ui/react';
import breakPoints from 'theme/base/breakpoints';

const useBelowBreakPoint = () => {
  const [isxsAndBelow] = useMediaQuery(`(max-width: ${breakPoints.xs})`);
  const [issmAndBelow] = useMediaQuery(`(max-width: ${breakPoints.sm})`);
  const [ismdAndBelow] = useMediaQuery(`(max-width: ${breakPoints.md})`);
  const [islgAndBelow] = useMediaQuery(`(max-width: ${breakPoints.lg})`);
  const [isxlAndBelow] = useMediaQuery(`(max-width: ${breakPoints.xl})`);

  return {
    isxsAndBelow,
    issmAndBelow,
    ismdAndBelow,
    islgAndBelow,
    isxlAndBelow,
  };
};
export default useBelowBreakPoint;
