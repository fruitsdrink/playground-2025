type TextAreaInputProps = {
  label: string;
  name: string;
  value: string;
  className?: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};
export function TextAreaInput({
  label,
  name,
  value,
  className,
  onChange,
}: TextAreaInputProps) {
  return (
    <div className={className}>
      <label htmlFor={name}>{label}</label>
      <textarea name={name} value={value} onChange={onChange}></textarea>
    </div>
  );
}
