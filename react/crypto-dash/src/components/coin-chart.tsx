import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { useEffect, useState } from "react";
import type { CoinChartData } from "../types";
import { Spinner } from "./spinner";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale
);

const API_URL = import.meta.env.VITE_COIN_API_URL;
const API_KEY = import.meta.env["VITE_API_KEY"];

const options = {
  method: "GET",
  headers: { accept: "application/json", "x-cg-demo-api-key": API_KEY },
};

type CoinChartProps = {
  coinId: string;
};
export function CoinChart({ coinId }: CoinChartProps) {
  const [chartData, setChartData] = useState<{
    datasets: {
      label: string;
      data: { x: number; y: number }[];
      fill: boolean;
      borderColor: string;
      backgroundColor: string;
      pointRadius?: number;
      tension?: number;
    }[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${API_URL}/${coinId}/market_chart?vs_currency=usd&days=7`,
          options
        );
        if (!response.ok) throw new Error("Failed to fetch chart data");

        const data: CoinChartData = await response.json();
        const prices = data.prices.map((price) => ({
          x: price[0],
          y: price[1],
        }));
        setChartData({
          datasets: [
            {
              label: "Price (USD)",
              data: prices,
              fill: false,
              borderColor: "#007bff",
              backgroundColor: "rgba(0, 123, 255, 0.1)",
              pointRadius: 0,
              tension: 0.3,
            },
          ],
        });
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, [coinId]);

  return (
    <div style={{ marginTop: "30px" }}>
      {loading && <Spinner />}
      {error && <div className="error">❌ {error}</div>}
      {chartData && (
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                mode: "index",
                intersect: false,
              },
            },
            scales: {
              x: {
                type: "time",
                time: {
                  unit: "day",
                },
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 7,
                },
              },
              y: {
                ticks: {
                  callback: (value) => `$${value.toLocaleString()}`,
                },
              },
            },
          }}
        />
      )}
    </div>
  );
}
