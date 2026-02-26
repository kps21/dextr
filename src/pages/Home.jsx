import { useEffect, useState } from "react";
import { getQuote } from "../services/finnhubService";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";

const symbols = ["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA"];

function Home() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      const results = await Promise.all(
        symbols.map(async (symbol) => {
          const data = await getQuote(symbol);

          if (!data) return null;

          return {
            symbol,
            price: data.c,
            change: data.dp,
          };
        }),
      );

      setStocks(results.filter(Boolean));
      setLoading(false);
    };

    load();
  }, []);

  if (loading) {
    return (
      <p className="text-gray-900 dark:text-gray-100">Loading dashboard...</p>
    );
  }

  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Dashboard
      </h1>
      <SearchBar />

      {stocks.length === 0 && <p>No data available. Check API key.</p>}

      <div className="grid md:grid-cols-3 gap-6">
        {stocks.map((stock) => (
          <Link
            key={stock.symbol}
            to={`/stock/${stock.symbol}`}
            className="bg-emerald-800 hover:bg-emerald-700 
           text-white 
           dark:bg-emerald-500 dark:hover:bg-emerald-800 dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-bold">{stock.symbol}</h2>

            <p className="text-2xl mt-2">${stock.price}</p>

            <p
              className={stock.change >= 0 ? "text-green-500" : "text-red-500"}
            >
              {stock.change}%
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
