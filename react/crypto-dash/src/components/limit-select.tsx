type LimitSelectProps = {
  limit: number;
  onChange: (limit: number) => void;
};
export function LimitSelect({ limit, onChange }: LimitSelectProps) {
  return (
    <div className="controls">
      <label htmlFor="limit">Show:</label>
      <select
        id="limit"
        value={limit}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  );
}
