import { useEffect, useState } from "react";
import { getNews } from "../services/finnhubService";

const mockNews = [
  { id: 1, headline: "Company reports strong quarterly earnings", url: "#" },
  { id: 2, headline: "Stock sees increased investor confidence", url: "#" },
  { id: 3, headline: "Market analysts revise forecasts", url: "#" },
];

function NewsFeed({ symbol }) {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await getNews(symbol);
      setNews(data.length ? data.slice(0, 5) : mockNews);
    };

    load();
  }, [symbol]);

  return (
    <div className="mt-6 text-gray-900 dark:text-gray-100">
      <h2 className="text-xl font-bold mb-4">News</h2>

      {news.map((item) => (
        <div
          key={item.id}
          className="bg-emerald-800 hover:bg-emerald-700 
           text-white 
           dark:bg-emerald-500 dark:hover:bg-emerald-800 dark:bg-gray-800 p-4 rounded shadow mb-3"
        >
          <a
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="hover:underline font-semibold"
          >
            {item.headline}
          </a>
        </div>
      ))}
    </div>
  );
}

export default NewsFeed;
