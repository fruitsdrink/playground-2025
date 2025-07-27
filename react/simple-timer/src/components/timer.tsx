import { useEffect, useRef, useState } from "react";
import { TimerDisplay } from "./timer-display";
import { TimerControl } from "./timer-control";

export function Timer() {
  const timerRef = useRef<number | null>(null);
  const [time, setTime] = useState(() => {
    const time = localStorage.getItem("time");
    return time ? Number(time) : 0;
  });
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("time", time.toString());
  }, [time]);

  const clearTimer = () => {
    if (!timerRef.current) return;

    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const handleToggleTimer = () => {
    if (isRunning) {
      clearTimer();
      setIsRunning(false);
    } else {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
      setIsRunning(true);
    }
  };

  const handleResetTimer = () => {
    clearTimer();
    setTime(0);
    setIsRunning(false);
    localStorage.removeItem("time");
  };

  return (
    <>
      <TimerDisplay time={time} />
      <TimerControl
        isRunning={isRunning}
        onToggle={handleToggleTimer}
        onReset={handleResetTimer}
      />
    </>
  );
}
