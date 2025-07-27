import { BarLoader } from "react-spinners";

type SpinnerProps = {
  color?: string;
  size?: number;
};
export function Spinner({ color = "blue", size = 150 }: SpinnerProps) {
  return (
    <div>
      <BarLoader
        color={color}
        width={size}
        cssOverride={{
          display: "block",
          margin: "0 auto 50px auto",
        }}
        aria-label="Loading Spinner"
      />
    </div>
  );
}
