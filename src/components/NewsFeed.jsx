import { useEffect, useState } from "react";
import { getNews } from "../services/finnhubService";

const mockNews = [
  {
    id: 1,
    headline: "Company reports strong quarterly earnings",
    url: "#",
    source: "MarketWatch",
  },
  {
    id: 2,
    headline: "Stock sees increased investor confidence",
    url: "#",
    source: "Reuters",
  },
  {
    id: 3,
    headline: "Market analysts revise forecasts",
    url: "#",
    source: "Bloomberg",
  },
];

function NewsFeed({ symbol }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await getNews(symbol);
      // Fallback to mock data if API returns empty
      setNews(data.length ? data.slice(0, 5) : mockNews);
      setLoading(false);
    };

    load();
  }, [symbol]);

  return (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-1 h-6 bg-emerald-500 rounded-full" />
        <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">
          Latest on {symbol}
        </h2>
      </div>

      <div className="space-y-4">
        {loading
          ? /* Simple Skeleton Loader */
            [1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-20 w-full bg-gray-200 dark:bg-white/5 animate-pulse rounded-2xl"
              />
            ))
          : news.map((item, index) => (
              <div
                key={item.id || index}
                className="group relative overflow-hidden transition-all duration-300
                         /* Glass Design */
                         bg-white/40 dark:bg-white/5 backdrop-blur-md 
                         border border-white/40 dark:border-white/10 
                         rounded-2xl hover:border-emerald-500/50 hover:scale-[1.02] shadow-sm"
              >
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block p-4 relative z-10"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest opacity-80">
                      {item.source || "Finance News"}
                    </span>
                    <h3 className="text-sm md:text-base font-bold text-gray-800 dark:text-gray-200 group-hover:text-emerald-500 transition-colors leading-snug">
                      {item.headline}
                    </h3>
                  </div>

                  {/* Subtle Arrow indicator on hover */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                    <span className="text-emerald-500">→</span>
                  </div>
                </a>

                {/* Subtle background glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </div>
            ))}
      </div>
    </div>
  );
}

export default NewsFeed;
