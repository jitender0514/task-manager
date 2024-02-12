import { useState, useEffect } from "react";
import moment from "moment";
import { remainingSecondsLeft } from "../utils/common";

/**
 * Custom Hooks to calculate the remaining seconds left.
 * Logic: Use the provided datetime string to calculate the remaining seconds
 * by subtracting the current time from the provided datetime string ('endDate').
 *
 * @param endDate (string) the end-date to calculate the remaining seconds
 * @returns (number) remaining seconds.
 */
const useTimerHook = (endDate: string): [number] => {
  const [remainingSeconds, setRemainingSeconds] = useState(
    remainingSecondsLeft(endDate)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      // Calculate remaining seconds is 0 or not.
      // If the remaining seconds is 0, then clear the timer (clearInterval).
      if (
        remainingSecondsLeft(moment().add(remainingSeconds, "seconds").format()) <= 0 && interval
      ) {
        clearInterval(interval);
      } else {
        setRemainingSeconds((prev) =>
          remainingSecondsLeft(moment().add(prev, "seconds").format())
        );
      }
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => {
      interval && clearInterval(interval);
    };
  }, []);

  return [remainingSeconds];
};

export { useTimerHook };
