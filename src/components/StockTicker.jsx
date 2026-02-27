import { useEffect, useState } from "react";
import { getQuote } from "../services/finnhubService";

const symbols = ["AAPL", "TSLA", "MSFT", "GOOGL", "AMZN", "NVDA"];

function StockTicker() {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    const fetchPrices = async () => {
      const results = await Promise.all(
        symbols.map(async (symbol) => {
          try {
            const quote = await getQuote(symbol);
            return quote
              ? {
                  symbol,
                  price: quote.c,
                  change: quote.d,
                  percent: quote.dp,
                }
              : null;
          } catch (err) {
            return null;
          }
        }),
      );
      setPrices(results.filter(Boolean));
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden my-4 py-1">
      {/* Glassy Container */}
      <div className="mx-auto max-w-7xl px-2">
        <div className="bg-white/30 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-2xl shadow-lg overflow-hidden">
          <div className="flex whitespace-nowrap animate-scroll py-3">
            {/* Duplicating array for seamless loop */}
            {[...prices, ...prices, ...prices].map((stock, index) => (
              <div
                key={index}
                className="flex items-center gap-4 px-8 border-r border-white/10 last:border-none"
              >
                <span className="font-bold tracking-wider text-gray-800 dark:text-gray-200">
                  {stock.symbol}
                </span>
                <span className="font-mono text-gray-900 dark:text-white">
                  ${stock.price?.toFixed(2)}
                </span>
                <span
                  className={`flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${
                    stock.change >= 0
                      ? "bg-green-500/20 text-green-500"
                      : "bg-red-500/20 text-red-500"
                  }`}
                >
                  {stock.change >= 0 ? "▲" : "▼"}
                  {Math.abs(stock.percent).toFixed(2)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Side Fades for smooth entry/exit effect */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent z-10 pointer-events-none" />
    </div>
  );
}

export default StockTicker;
