import { CoinCard } from "../components/coin-card";
import { LimitSelect } from "../components/limit-select";
import { SearchInput } from "../components/search-input";
import { SortSelect } from "../components/sort-select";
import { Spinner } from "../components/spinner";
import type { Coin } from "../types";

type HomePageProps = {
  coins: Coin[];
  keyword: string | undefined;
  setKeyword: (keyword: string | undefined) => void;
  limit: number;
  setLimit: (limit: number) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  loading: boolean;
  error: string | null;
};
export function HomePage({
  coins,
  keyword,
  setKeyword,
  limit,
  setLimit,
  sortBy,
  setSortBy,
  loading,
  error,
}: HomePageProps) {
  const filteredCoins = coins
    .filter(
      (coin) =>
        coin.name.toLowerCase().includes(keyword?.toLowerCase() ?? "") ||
        coin.symbol.toLowerCase().includes(keyword?.toLowerCase() ?? "")
    )
    .slice()
    .sort((a, b) => {
      switch (sortBy) {
        case "market_cap_asc":
          return a.market_cap - b.market_cap;
        case "market_cap_desc":
          return b.market_cap - a.market_cap;
        case "price_asc":
          return a.current_price - b.current_price;
        case "price_desc":
          return b.current_price - a.current_price;
        case "change_asc":
          return a.price_change_percentage_24h - b.price_change_percentage_24h;
        case "change_desc":
          return b.price_change_percentage_24h - a.price_change_percentage_24h;
        default:
          return 0;
      }
    });

  return (
    <div>
      <h1>🚀 Crypto Dash</h1>

      <div className="top-controls">
        <SearchInput
          keyword={keyword}
          onChange={(value) => {
            setKeyword(value);
          }}
        />
        <SortSelect sort={sortBy} onChange={(sort) => setSortBy(sort)} />
        <LimitSelect limit={limit} onChange={(limit) => setLimit(limit)} />
      </div>

      {loading && <Spinner color="white" />}

      {error && <div className="error">{error}</div>}

      {!loading && !error && (
        <main className="grid">
          {filteredCoins.length > 0 ? (
            filteredCoins.map((coin) => <CoinCard key={coin.id} coin={coin} />)
          ) : (
            <p>Not matching coins</p>
          )}
        </main>
      )}
    </div>
  );
}
