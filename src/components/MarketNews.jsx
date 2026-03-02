import React from "react";

const newsData = [
  {
    id: 1,
    title: "Apple beats earnings expectations",
    source: "Bloomberg",
    time: "2h ago",
  },
  {
    id: 2,
    title: "Tesla stock drops after delivery miss",
    source: "CNBC",
    time: "4h ago",
  },
  {
    id: 3,
    title: "Fed signals possible rate cut this year",
    source: "Reuters",
    time: "6h ago",
  },
];

function MarketNews() {
  return (
    <div className="bg-white/40 mt-4 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-2xl p-6">
      <h2 className="text-lg font-bold mb-4 dark:text-white">📰 Market News</h2>

      <div className="space-y-4">
        {newsData.map((news) => (
          <div
            key={news.id}
            className="p-4 rounded-xl hover:bg-emerald-500/10 transition cursor-pointer"
          >
            <p className="font-semibold text-gray-800 dark:text-gray-200">
              {news.title}
            </p>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {news.source} • {news.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MarketNews;
