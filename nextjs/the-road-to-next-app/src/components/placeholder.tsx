import { LucideMessageSquareWarning } from "lucide-react";
import React, { cloneElement } from "react";

type PlaceholderProps = {
  label: string;
  icon?: React.ReactElement<{ className?: string }>;
  button?: React.ReactElement<{ className?: string }>;
};
export function Placeholder({
  label,
  icon = <LucideMessageSquareWarning />,
  button = <div className="h-10" />,
}: PlaceholderProps) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 self-center text-muted-foreground gap-y-2">
      {cloneElement(icon, {
        className: "w-16 h-16",
      })}
      <h2 className="font-bold text-lg text-center">{label}</h2>
      {cloneElement(button, {
        className: "h-10",
      })}
    </div>
  );
}
