import { useState } from "react";
import { searchStock } from "../services/finnhubService";
import { Link } from "react-router-dom";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (value) => {
    setQuery(value);
    if (value.length > 2) {
      const data = await searchStock(value);
      setResults(data.slice(0, 5));
    } else {
      setResults([]);
    }
  };

  return (
    <div className="relative mb-2 group">
      {/* Search Input with Glass Effect */}
      <div className="relative flex items-center">
        <input
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search stocks, indices, ETFs..."
          className="w-full p-4 pl-12 rounded-2xl transition-all duration-300
                     bg-white/40 dark:bg-white/5 
                     backdrop-blur-md border border-white/30 dark:border-white/10
                     text-gray-900 dark:text-white placeholder-gray-500
                     focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50
                     shadow-lg group-hover:shadow-emerald-500/10"
        />
        {/* Search Icon */}
        <svg
          className="absolute left-4 w-5 h-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Glassy Dropdown Results */}
      {results.length > 0 && (
        <div
          className="absolute w-full mt-2 rounded-2xl overflow-hidden z-50
                     bg-white/80 dark:bg-gray-900/80 
                     backdrop-blur-xl border border-white/20 dark:border-white/10
                     shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200"
        >
          {results.map((item) => (
            <Link
              key={item.symbol}
              to={`/stock/${item.symbol}`}
              className="flex items-center justify-between p-4 border-b border-white/10 dark:border-gray-800/50
                         hover:bg-emerald-500/10 transition-colors group/item"
              onClick={() => {
                setResults([]);
                setQuery("");
              }}
            >
              <div className="flex flex-col">
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {item.symbol}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[200px] md:max-w-md">
                  {item.description}
                </span>
              </div>
              <span className="opacity-0 group-hover/item:opacity-100 transition-opacity text-emerald-500">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
