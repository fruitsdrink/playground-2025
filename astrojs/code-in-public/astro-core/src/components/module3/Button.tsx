import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}
export default function Button({ children, ...rest }: Omit<Props, "onClick">) {
  return (
    <button
      onClick={() => {
        alert("Button clicked");
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
