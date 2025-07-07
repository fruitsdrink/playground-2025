"use client";

import clsx from "clsx";
import { LucideLoaderCircle } from "lucide-react";
import { cloneElement, ReactElement } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

type SubmitButtonProps = {
  label?: string;
  icon?: ReactElement<React.SVGProps<SVGSVGElement>>;
  // icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
};
export function SubmitButton({
  label,
  icon,
  variant,
  size,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit" variant={variant} size={size}>
      {pending && (
        <LucideLoaderCircle
          className={clsx("w-4 h-4 animate-spin", {
            "mr-2": !!label,
          })}
        />
      )}
      {label}
      {pending ? null : icon ? (
        <span
          className={clsx({
            "ml-2": !!label,
          })}
        >
          {cloneElement(icon, { className: "h-4 w-4" })}
        </span>
      ) : null}
    </Button>
  );
}
