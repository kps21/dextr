import React from "react";

const MarketSentiment = ({ stocks }) => {
  // Logic: Calculate ratio of gainers vs losers in your list
  const gainers = stocks.filter((s) => s.change >= 0).length;
  const sentiment = (gainers / stocks.length) * 100;

  return (
    <div className="bg-white/40 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-2xl p-4 mb-6">
      <div className="flex justify-between items-end mb-2">
        <span className="text-xs font-black uppercase tracking-tighter text-gray-500">
          Market Sentiment
        </span>
        <span
          className={`text-sm font-bold ${sentiment > 50 ? "text-emerald-500" : "text-rose-500"}`}
        >
          {sentiment > 50 ? "Bullish" : "Bearish"}
        </span>
      </div>
      <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-rose-500 via-yellow-500 to-emerald-500 transition-all duration-1000"
          style={{ width: `${sentiment}%` }}
        />
      </div>
      <div className="flex justify-between mt-1 text-[10px] font-bold text-gray-400">
        <span>FEAR</span>
        <span>GREED</span>
      </div>
    </div>
  );
};

export default MarketSentiment;
