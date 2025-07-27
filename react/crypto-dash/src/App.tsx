import { useCallback, useEffect, useState } from "react";
import type { Coin } from "./types";
import { BrowserRouter, Route, Routes } from "react-router";
import { HomePage } from "./pages/home";
import { AboutPage } from "./pages/about";
import { Header } from "./components/header";
import { NotFoundPage } from "./pages/not-found";
import { CoinDetailPage } from "./pages/coin-detail";

const API_KEY = import.meta.env["VITE_API_KEY"];
const API_URL = import.meta.env["VITE_COINS_API_URL"];

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

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              coins={coins}
              keyword={keyword}
              setKeyword={setKeyword}
              limit={limit}
              setLimit={setLimit}
              sortBy={sortBy}
              setSortBy={setSortBy}
              loading={loading}
              error={error}
            />
          }
        />
        <Route path="/coin/:id" element={<CoinDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
