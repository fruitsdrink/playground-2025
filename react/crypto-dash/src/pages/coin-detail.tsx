import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import type { CoinDetail } from "../types";
import { Spinner } from "../components/spinner";
import { CoinChart } from "../components/coin-chart";

const API_KEY = import.meta.env["VITE_API_KEY"];
const API_URL = import.meta.env["VITE_COIN_API_URL"];

const options = {
  method: "GET",
  headers: { accept: "application/json", "x-cg-demo-api-key": API_KEY },
};

export function CoinDetailPage() {
  const { id } = useParams<{ id: string }>();

  const [coin, setCoin] = useState<CoinDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        setError(null);
        setLoading(true);

        const res = await fetch(`${API_URL}/${id}`, options);
        if (!res.ok) {
          throw new Error("Failed to fetch coin details");
        }
        const data = await res.json();
        setCoin(data);
        console.log(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoin();
  }, [id]);

  return (
    <>
      <div className="coin-details-container">
        <Link to={"/"}>Back To Home</Link>
        <h1 className="coin-details-title">
          {coin
            ? `${coin.name} (${coin.symbol.toUpperCase()})`
            : "Coin Details"}
        </h1>

        {loading && <Spinner />}
        {error && <div className="error">❌ {error}</div>}
        {!loading && !error && (
          <>
            <img
              src={coin?.image.large}
              alt={coin?.name}
              className="coin-details-image"
            />
            <p>{coin?.description.en.split(".")[0] + "."}</p>
            <div className="coin-details-info">
              <h3>Rank: #{coin?.market_cap_rank}</h3>
              <h3>
                Current Price: $
                {coin?.market_data.current_price.usd.toLocaleString()}
              </h3>
              <h4>
                Market Cap: {coin?.market_data.market_cap.usd.toLocaleString()}
              </h4>
              <h4>
                24h High: ${coin?.market_data.high_24h.usd.toLocaleString()}
              </h4>
              <h4>
                24h Low: ${coin?.market_data.low_24h.usd.toLocaleString()}
              </h4>
              <h4>
                24h Price Change: $
                {coin?.market_data.price_change_24h.toFixed(2).toLocaleString()}{" "}
                ({coin?.market_data.price_change_percentage_24h.toFixed(2)}%)
              </h4>
              <h4>
                Total Supply:{" "}
                {coin?.market_data.total_supply?.toLocaleString() || "N/A"}
              </h4>
              <h4>
                All-Time High: ${coin?.market_data.ath.usd.toLocaleString()} on{" "}
                {coin &&
                  new Date(coin.market_data.ath_date.usd).toLocaleDateString()}
              </h4>
              <h4>
                All-Time Low: ${coin?.market_data.atl.usd.toLocaleString()} on{" "}
                {coin &&
                  new Date(coin.market_data.atl_date.usd).toLocaleDateString()}
              </h4>
              <h4>
                Last Updated:{" "}
                {coin && new Date(coin.last_updated).toLocaleDateString()}
              </h4>
            </div>

            {coin && <CoinChart coinId={coin.id} />}

            <div className="coin-details-links">
              {coin?.links.homepage[0] && (
                <p>
                  🌍{" "}
                  <a
                    href={coin.links.homepage[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Website
                  </a>
                </p>
              )}
              {coin?.links.blockchain_site[0] && (
                <p>
                  🔗{" "}
                  <a
                    href={coin.links.blockchain_site[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Blockchain Explorer
                  </a>
                </p>
              )}
              {coin && coin.categories && coin?.categories.length > 0 && (
                <p>Categories: {coin?.categories.join(", ")}</p>
              )}
            </div>
            {!loading && !error && !coin && <div>No coin data available</div>}
          </>
        )}
      </div>
    </>
  );
}
