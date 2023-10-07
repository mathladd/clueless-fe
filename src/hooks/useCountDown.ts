import { useLayoutEffect, useState } from 'react';
import { differenceInSeconds } from 'date-fns';
import { getNumZeroPadding } from 'helper/number';
import { getDuration } from 'helper/date';

const useCountDown = (endedAt: Date) => {
  const [endTime, setEndTime] = useState<Duration>({});
  const [dateEndsIn, setDateEndsIn] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [expired, setExpired] = useState(false);
  const [delay, setDelay] = useState(1);

  useLayoutEffect(() => {
    const interval = setInterval(() => {
      if (differenceInSeconds(endedAt, new Date()) > 0) {
        const { daysDuration, objDuration } = getDuration(endedAt, new Date());
        const numTextDays = daysDuration;
        const numTextHours = getNumZeroPadding(objDuration.hours);
        const numTextMins = getNumZeroPadding(objDuration.minutes);
        if (numTextDays > 0) setDelay(60);
        setEndTime(objDuration);
        setDateEndsIn(`${numTextDays}d:${numTextHours}h:${numTextMins}m`);
      } else {
        setEndTime({
          years: 0,
          months: 0,
          weeks: 0,
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        setDateEndsIn('00h:00m:00s');
        setExpired(true);
      }
    }, 1000 * delay);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endedAt, delay]);

  const { days, hours, minutes, seconds } = endTime;

  useLayoutEffect(() => {
    setIsLoading(!Object.values({ days, hours, minutes, seconds }).every((el) => el !== undefined));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  return {
    days,
    hours: getNumZeroPadding(hours),
    minutes: getNumZeroPadding(minutes),
    seconds: getNumZeroPadding(seconds),
    dateEndsIn,
    isLoading,
    expired,
  };
};

export default useCountDown;
