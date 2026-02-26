import { useEffect, useState } from "react";
import { getMarketNews } from "../services/finnhubService";

function MarketNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      const data = await getMarketNews();
      setNews(data.slice(0, 20)); // limit
      setLoading(false);
    };

    loadNews();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Market News
      </h1>

      {loading && (
        <p className="text-gray-700 dark:text-gray-300">Loading news...</p>
      )}

      {!loading && news.length === 0 && (
        <p className="text-gray-700 dark:text-gray-300">
          No market news available.
        </p>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-800 
                       text-gray-900 dark:text-gray-100 
                       rounded shadow p-4 transition"
          >
            {item.image && (
              <img
                src={item.image}
                alt="news"
                className="rounded mb-3 h-40 w-full object-cover"
              />
            )}

            <h2 className="font-semibold text-lg mb-2 line-clamp-2">
              {item.headline}
            </h2>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-3">
              {item.summary}
            </p>

            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 dark:text-blue-400 font-medium"
            >
              Read More →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MarketNews;
