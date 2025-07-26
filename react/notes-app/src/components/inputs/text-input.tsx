type TextInputProps = {
  label: string;
  name: string;
  value: string;
  required?: boolean;
  className?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
export function TextInput({
  label,
  name,
  value,
  required = false,
  className,
  onChange,
}: TextInputProps) {
  return (
    <div className={className}>
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}
