type SortSelectProps = {
  sort: string;
  onChange: (sort: string) => void;
};
export function SortSelect({ sort, onChange }: SortSelectProps) {
  return (
    <div className="controls">
      <label htmlFor="sort">Sort By:</label>
      <select id="sort" value={sort} onChange={(e) => onChange(e.target.value)}>
        <option value="market_cap_desc">Market Cap (High To Low)</option>
        <option value="market_cap_asc">Market Cap (Low To High)</option>
        <option value="price_desc">Price (High To Low)</option>
        <option value="price_asc">Price (Low To High)</option>
        <option value="change_desc">24h Change (High To Low)</option>
        <option value="change_asc">24h Change (Low To High)</option>
      </select>
    </div>
  );
}
