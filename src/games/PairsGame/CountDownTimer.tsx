import React, { useEffect, useState } from "react";

type CountDownTimerProps = {
  hoursMinSecs: {
    hours?: number;
    minutes?: number;
    seconds?: number;
  };
  isTimerOn: boolean;
  setHoursMinSecs: React.Dispatch<React.SetStateAction<{ minutes: number; seconds: number }>>;
};
const CountDownTimer = ({ hoursMinSecs, isTimerOn, setHoursMinSecs }: CountDownTimerProps) => {
  const [[hrs, mins, secs], setTime] = useState<any>([]);

  useEffect(() => {
    setTime([hoursMinSecs.hours, hoursMinSecs.minutes, hoursMinSecs.seconds]);
  }, [hoursMinSecs]);

  useEffect(() => {
    let timerId: any;
    const tick = () => {
      // const reset = () => setTime([hours, minutes, seconds]);
      // if (hrs === 0 && mins === 0 && secs === 0) reset();
      // else
      if (mins === 0 && secs === 0) {
        setHoursMinSecs({ minutes: 0, seconds: 0 });
      } else if (secs === 0) {
        setTime([hrs, mins - 1, 59]);
      } else {
        setTime([hrs, mins, secs - 1]);
      }
    };
    if (isTimerOn) {
      timerId = setInterval(() => tick(), 1000);
    }
    return () => clearInterval(timerId);
  }, [isTimerOn, hrs, mins, secs]);

  return (
    <div>
      <p>{`Timer: ${mins?.toString().padStart(2, "0")}:${secs?.toString().padStart(2, "0")}`}</p>
    </div>
  );
};

export default CountDownTimer;
