import { useCallback, useEffect, useState } from "react";
import type { Coin } from "./types";
import { CoinCard } from "./components/coin-card";
import { LimitSelect } from "./components/limit-select";
import { SearchInput } from "./components/search-input";
import { SortSelect } from "./components/sort-select";

const API_KEY = import.meta.env["VITE_API_KEY"];
const API_URL = import.meta.env["VITE_API_URL"];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [coins, setCoins] = useState<Coin[]>([]);
  const [limit, setLimit] = useState(10);
  const [keyword, setKeyword] = useState<string | undefined>("");
  const [sortBy, setSortBy] = useState("market_cap_desc");

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    const options = {
      method: "GET",
      headers: { accept: "application/json", "x-cg-demo-api-key": API_KEY },
    };
    try {
      const url = `${API_URL}?vs_currency=usd&&locale=en&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`;
      const res = await fetch(url, options);
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();

      setError(null);
      setCoins(data);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
      {loading && (
        <p
          style={{
            textAlign: "center",
          }}
        >
          Loading...
        </p>
      )}
      {error && <div className="error">{error}</div>}

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
