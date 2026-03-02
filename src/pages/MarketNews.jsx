import { useEffect, useState } from "react";
import { getMarketNews } from "../services/finnhubService";

function MarketNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      try {
        const data = await getMarketNews();
        setNews(data.slice(0, 20));
      } catch (error) {
        console.error("Failed to fetch news", error);
      }
      setLoading(false);
    };

    loadNews();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-1 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Market News
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Latest updates from global financial markets
          </p>
        </div>
        <div className="h-1 w-20 bg-emerald-500 rounded-full hidden md:block" />
      </div>

      {loading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-80 w-full bg-gray-200 dark:bg-white/5 animate-pulse rounded-3xl"
            />
          ))}
        </div>
      )}

      {!loading && news.length === 0 && (
        <div className="text-center py-20 bg-white/30 dark:bg-white/5 backdrop-blur-md rounded-3xl border border-dashed border-gray-300 dark:border-white/10">
          <p className="text-gray-500 dark:text-gray-400">
            No market news available at the moment.
          </p>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.map((item) => (
          <div
            key={item.id}
            className="group relative flex flex-col bg-white/40 dark:bg-white/5 
                       backdrop-blur-xl border border-white/40 dark:border-white/10 
                       rounded-3xl overflow-hidden shadow-xl transition-all duration-500 
                       hover:-translate-y-2 hover:shadow-emerald-500/10 hover:border-emerald-500/40"
          >
            {/* Image Section */}
            {item.image ? (
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.headline}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ) : (
              <div className="h-48 w-full bg-emerald-500/10 flex items-center justify-center">
                <span className="text-4xl opacity-20">📰</span>
              </div>
            )}

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
                  {item.source || "Finance"}
                </span>
                <span className="text-[10px] text-gray-400 uppercase font-medium">
                  • {new Date(item.datetime * 1000).toLocaleDateString()}
                </span>
              </div>

              <h2 className="font-bold text-lg mb-3 text-gray-800 dark:text-gray-100 line-clamp-2 group-hover:text-emerald-500 transition-colors">
                {item.headline}
              </h2>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 line-clamp-3 leading-relaxed">
                {item.summary}
              </p>

              <div className="mt-auto">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400 
                             group-hover:gap-4 transition-all"
                >
                  READ STORY
                  <span className="text-lg">→</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MarketNews;
