import { useEffect, useRef } from "react";

type TimerControlProps = {
  isRunning: boolean;
  onToggle: () => void;
  onReset: () => void;
};
export function TimerControl({
  isRunning,
  onToggle,
  onReset,
}: TimerControlProps) {
  const startButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (startButtonRef.current) {
      startButtonRef.current.focus();
    }
  }, []);

  return (
    <>
      <button
        ref={startButtonRef}
        onClick={onToggle}
        className="mt-3 bg-green-500 hover:bg-green-600 px-4 py-2 rounded mr-3 text-white"
      >
        {isRunning ? "Pause" : "Start"}
      </button>
      <button
        onClick={onReset}
        className="mt-3 bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white"
      >
        Reset
      </button>
    </>
  );
}
