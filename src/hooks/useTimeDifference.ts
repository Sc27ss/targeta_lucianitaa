import { useState, useEffect } from 'react';

export function useTimeDifference(startDate: Date) {
  const [diff, setDiff] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalSeconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = now.getTime() - startDate.getTime();

      const totalSeconds = Math.floor(difference / 1000);
      const days = Math.floor(totalSeconds / (3600 * 24));
      const hours = Math.floor(totalSeconds % (3600 * 24) / 3600);
      const minutes = Math.floor(totalSeconds % 3600 / 60);
      const seconds = totalSeconds % 60;

      setDiff({ days, hours, minutes, seconds, totalSeconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [startDate]);

  return diff;
}