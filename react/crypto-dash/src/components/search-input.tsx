type SearchInputProps = {
  keyword: string | undefined;
  onChange: (keyword: string | undefined) => void;
};
export function SearchInput({ keyword, onChange }: SearchInputProps) {
  return (
    <div className="filter">
      <input
        type="text"
        value={keyword}
        placeholder="Search coins by name or symbol"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
