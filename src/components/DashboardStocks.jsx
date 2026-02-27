import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getQuote } from "../services/finnhubService";

function DashboardStocks() {
  const { items } = useSelector((state) => state.portfolio);
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Using Promise.all for faster concurrent fetching
      const results = await Promise.all(
        items.map(async (stock) => {
          try {
            const quote = await getQuote(stock.symbol);
            return quote
              ? {
                  symbol: stock.symbol,
                  price: quote.c,
                  change: quote.d,
                  percent: quote.dp,
                  high: quote.h,
                  low: quote.l,
                  volume: quote.v,
                }
              : null;
          } catch (err) {
            console.error(err);
            return null;
          }
        }),
      );
      setStockData(results.filter(Boolean));
    };

    if (items.length > 0) fetchData();
  }, [items]);

  if (items.length === 0)
    return (
      <div className="p-8 text-center bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
        <p className="text-gray-500 dark:text-gray-400">
          Your portfolio is empty. Start trading!
        </p>
      </div>
    );

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/20 dark:border-white/10 shadow-2xl bg-white/40 dark:bg-white/5 backdrop-blur-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-widest bg-white/20 dark:bg-black/20">
              <th className="p-5 font-semibold">Company</th>
              <th className="p-5 font-semibold">Market Price</th>
              <th className="p-5 font-semibold">1D Change</th>
              <th className="p-5 font-semibold hidden md:table-cell">Volume</th>
              <th className="p-5 font-semibold">Price Range</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/10 dark:divide-gray-800/50">
            {stockData.map((stock) => (
              <tr
                key={stock.symbol}
                className="group hover:bg-emerald-500/5 dark:hover:bg-emerald-500/10 transition-all duration-200"
              >
                <td className="p-5">
                  <span className="font-bold text-gray-800 dark:text-white group-hover:text-emerald-500 transition-colors">
                    {stock.symbol}
                  </span>
                </td>

                <td className="p-5 font-mono text-gray-900 dark:text-gray-100">
                  ${stock.price?.toFixed(2)}
                </td>

                <td className="p-5">
                  <div
                    className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-bold ${
                      stock.change >= 0
                        ? "bg-green-500/10 text-green-500"
                        : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {stock.change >= 0 ? "+" : ""}
                    {stock.change?.toFixed(2)} ({stock.percent}%)
                  </div>
                </td>

                <td className="p-5 text-gray-500 dark:text-gray-400 text-sm hidden md:table-cell font-mono">
                  {stock.volume?.toLocaleString()}
                </td>

                <td className="p-5 min-w-[120px]">
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-[10px] text-gray-400 uppercase">
                      <span>${stock.low}</span>
                      <span>${stock.high}</span>
                    </div>
                    <div className="relative w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      {/* Dynamic Progress Bar based on current price relative to high/low */}
                      <div
                        className="absolute h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                        style={{
                          width: `${((stock.price - stock.low) / (stock.high - stock.low)) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DashboardStocks;
