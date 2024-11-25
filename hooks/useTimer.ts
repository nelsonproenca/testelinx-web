import { useCallback, useEffect, useState } from 'react';

const interval =
  (delay: number = 0) =>
  (callback: () => void) =>
    useEffect(() => {
      const id = setInterval(callback, delay);

      return () => clearInterval(id);
    }, [callback]);

const use1Second = interval(1000);

const useTimer = ({ initialSeconds = 0, initiallyRunning = false } = {}) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [running, setRunning] = useState(initiallyRunning);
  const tick = useCallback(
    () => (running ? setSeconds((seconds) => seconds + 1) : undefined),
    [running]
  );

  const start = () => setRunning(true);
  const reset = () => setSeconds(0);

  use1Second(tick);

  return { running, seconds, start, reset };
};

export default useTimer;
