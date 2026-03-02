import React from "react";

const trending = [
  { symbol: "NVDA", change: "+3.2%", current: 280, previews: 270 },
  { symbol: "TSLA", change: "-2.1%", current: 180, previews: 185 },
  { symbol: "AAPL", change: "+0.8%", current: 175, previews: 173 },
  { symbol: "META", change: "+1.5%", current: 320, previews: 315 },
];

function TrendingStocks() {
  return (
    <div className="bg-white/40 dark:bg-white/5 mt-4 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-2xl p-6">
      <h2 className="text-lg font-bold mb-4 dark:text-white">
        🔥 Trending Stocks
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trending.map((stock, index) => (
          <div
            key={index}
            className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 flex justify-between items-center"
          >
            <span className="font-semibold dark:text-white">
              {stock.symbol}
            </span>
            <span className="font-semibold dark:text-white">
              {stock.current}
            </span>
            <span
              className={`text-sm font-bold ${
                stock.change.startsWith("+")
                  ? "text-emerald-500"
                  : "text-rose-500"
              }`}
            >
              {stock.change}
            </span>
            <span
              className={`text-sm font-bold ${
                stock.change.startsWith("+")
                  ? "text-emerald-500"
                  : "text-rose-500"
              }`}
            >
              ${stock.current - stock.previews}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrendingStocks;
