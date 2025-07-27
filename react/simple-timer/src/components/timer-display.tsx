type TimerDisplayProps = {
  time: number;
};
export function TimerDisplay({ time }: TimerDisplayProps) {
  return <h2 className="text-4xl font-semibold mt-4">Timer: {time}</h2>;
}
