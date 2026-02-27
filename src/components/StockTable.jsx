import { useEffect, useState } from "react";
import { getQuote } from "../services/finnhubService";
import { Link } from "react-router-dom";

const STOCKS = ["AAPL", "MSFT", "TSLA", "NVDA", "AMZN", "GOOGL"];

function StockTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const results = await Promise.all(
          STOCKS.map(async (symbol) => {
            const res = await getQuote(symbol);
            // Finnhub returns { c: price, dp: percent_change, ... }
            return { symbol, ...res };
          }),
        );
        setData(results);
      } catch (err) {
        console.error("Error fetching market data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full px-4 py-6">
      <div className="flex items-center justify-between mb-6 px-2">
        <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">
          Market Watch
        </h2>
        <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20">
          Live Prices
        </span>
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-white/40 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-xl shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-500/5 dark:bg-white/5 text-[11px] uppercase tracking-widest font-black text-gray-500 dark:text-gray-400">
              <th className="px-6 py-4">Ticker</th>
              <th className="px-6 py-4">Last Price</th>
              <th className="px-6 py-4 text-right">24h Change</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200/50 dark:divide-white/5">
            {loading
              ? [...Array(4)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4">
                      <div className="h-4 w-12 bg-gray-300 dark:bg-white/10 rounded" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-16 bg-gray-300 dark:bg-white/10 rounded" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-12 bg-gray-300 dark:bg-white/10 ml-auto" />
                    </td>
                  </tr>
                ))
              : data.map((s) => {
                  const isPositive = s.dp >= 0;
                  return (
                    <tr
                      key={s.symbol}
                      className="group hover:bg-emerald-500/5 transition-colors duration-300"
                    >
                      <td className="px-6 py-5">
                        <Link
                          to={`/stock/${s.symbol}`}
                          className="flex items-center gap-3"
                        >
                          <span className="font-black text-gray-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                            {s.symbol}
                          </span>
                        </Link>
                      </td>
                      <td className="px-6 py-5 font-bold text-gray-700 dark:text-gray-200">
                        $
                        {s.c?.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })}
                      </td>
                      <td className="px-6 py-5 text-right">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-xl text-xs font-black shadow-sm ${
                            isPositive
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                              : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                          }`}
                        >
                          {isPositive ? "↑" : "↓"}{" "}
                          {Math.abs(s.dp || 0).toFixed(2)}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StockTable;
