interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}
export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      className={`bg-blue-500 text-white py-2 px-4 rounded cursor-pointer disabled:cursor-not-allowed hover:not-[:disabled]:bg-blue-600 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
