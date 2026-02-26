import { useEffect, useState } from "react";
import { getQuote } from "../services/finnhubService";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import StockTicker from "../components/StockTicker";
import DashboardStocks from "../components/DashboardStocks";
import AMCSection from "../components/AMCSection";

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
            high: data.h,
            low: data.l,
            volume: data.v,
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
      <StockTicker />

      {stocks.length === 0 && <p>No data available. Check API key.</p>}

      <div className="grid pt-4 md:grid-cols-3 gap-6">
        {stocks.map((stock) => (
          <Link
            key={stock.symbol}
            to={`/stock/${stock.symbol}`}
            className="bg-emerald-800 hover:bg-emerald-700 
           text-white 
           dark:bg-emerald-500 dark:hover:bg-emerald-800 dark:hover:bg-gray-700 dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <div className="flex justify-around gap-10">
              <div>
                <h2 className="text-xl font-bold">{stock.symbol}</h2>

                <p className="text-2xl mt-2">${stock.price}</p>

                <p
                  className={
                    stock.change >= 0 ? "text-green-500" : "text-red-500"
                  }
                >
                  {stock.change}%
                </p>
              </div>
              <div>
                <p className="mt-2">
                  <span className="text-green-500">High:</span> ${stock.high}
                </p>
                <p className="mt-2">
                  {" "}
                  <span className="text-red-500">Low:</span> ${stock.low}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <h4 className="text-lg font-semibold mt-6 mb-2 text-gray-900 dark:text-gray-100">
        Your Portfolio
      </h4>
      <DashboardStocks />
      <div className="pt-4">
        <AMCSection />
      </div>
    </div>
  );
}

export default Home;
