import type React from "react";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}
export function Button({ children, ...rest }: ButtonProps) {
  return (
    <button
      onClick={() => {
        alert("hi");
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
