type SelectInputProps = {
  label: string;
  name: string;
  value: string;
  options: { value: string; label: string }[];
  className?: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};
export function SelectInput({
  label,
  name,
  value,
  options,
  className,
  onChange,
}: SelectInputProps) {
  return (
    <div className={className}>
      <label htmlFor={name}>{label}</label>
      <select name={name} value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
