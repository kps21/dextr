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
    <div className="relative pt-5 mb-6">
      <input
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search stock (e.g. AAPL)"
        className="w-full p-3 border rounded shadow"
      />

      {results.length > 0 && (
        <div
          className="absolute w-full bg-emerald-800 hover:bg-emerald-700 
           text-white 
           dark:bg-emerald-500 dark:hover:bg-emerald-800 shadow rounded mt-1 z-10"
        >
          {results.map((item) => (
            <Link
              key={item.symbol}
              to={`/stock/${item.symbol}`}
              className="block p-2 hover:bg-gray-200"
              onClick={() => setResults([])}
            >
              {item.symbol} - {item.description}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
