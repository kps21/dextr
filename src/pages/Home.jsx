import { useEffect, useState } from "react";
import { getQuote } from "../services/finnhubService";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import StockTicker from "../components/StockTicker";
import DashboardStocks from "../components/DashboardStocks";
import AMCSection from "../components/AMCSection";
import MarketSentiment from "../components/MarketSentiment";
import { IndicesStrip } from "../components/IndicesStrip";

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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <SearchBar />
          <IndicesStrip />
        </div>
        <div className="lg:col-span-1">
          <MarketSentiment stocks={stocks} />
        </div>
      </div>
      <StockTicker />

      {stocks.length === 0 && <p>No data available. Check API key.</p>}

      <div className="grid pt-4 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stocks.map((stock) => (
          <Link
            key={stock.symbol}
            to={`/stock/${stock.symbol}`}
            className="group relative overflow-hidden p-6 rounded-2xl transition-all duration-300
                 /* Light Mode Glass */
                 bg-white/40 border border-white/20 backdrop-blur-md shadow-xl
                 /* Dark Mode Glass */
                 dark:bg-white/5 dark:border-white/10 dark:backdrop-blur-lg
                 /* Hover Effects */
                 hover:scale-[1.02] hover:shadow-emerald-500/20 hover:border-emerald-500/50"
          >
            <div
              className="absolute -inset-full bg-gradient-to-r from-transparent via-white/10 to-transparent 
                      group-hover:animate-[shimmer_2s_infinite] -rotate-45 pointer-events-none"
            />

            <div className="flex justify-between items-center relative z-10">
              <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-emerald-500 transition-colors">
                  {stock.symbol}
                </h2>
                <p className="text-3xl font-extrabold mt-2 text-gray-900 dark:text-gray-100">
                  ${stock.price.toLocaleString()}
                </p>
                <div
                  className={`mt-2 inline-flex items-center px-2 py-1 rounded-lg text-xs font-bold shadow-sm
            ${stock.change >= 0 ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-400"}`}
                >
                  {stock.change >= 0 ? "▲" : "▼"} {Math.abs(stock.change)}%
                </div>
              </div>

              <div className="text-right text-xs space-y-2 opacity-80 dark:text-gray-300">
                <p>
                  <span className="block text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                    High
                  </span>
                  <span className="text-sm font-semibold text-green-500">
                    ${stock.high}
                  </span>
                </p>
                <p>
                  <span className="block text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                    Low
                  </span>
                  <span className="text-sm font-semibold text-red-500">
                    ${stock.low}
                  </span>
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
