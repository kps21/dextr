import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addWatch, removeWatch } from "../features/watchlistSlice";
import { addStock, removeStock } from "../features/portfolioSlice";
import { getQuote } from "../services/finnhubService";
import { useState, useEffect } from "react";
import CandlestickChart from "../components/CandlestickChart";
import NewsFeed from "../components/NewsFeed";

function StockDetails() {
  const { symbol } = useParams();
  const dispatch = useDispatch();

  const watchlist = useSelector((state) => state.watchlist.items);
  const portfolio = useSelector((state) => state.portfolio.items);

  const [timeframe, setTimeframe] = useState("1D");
  const [priceData, setPriceData] = useState({
    current: null,
    change: null,
    percent: null,
  });
  const [loading, setLoading] = useState(true);

  const isInWatchlist = watchlist.includes(symbol);
  const isInPortfolio = portfolio.some((stock) => stock.symbol === symbol);

  useEffect(() => {
    const loadPrice = async () => {
      setLoading(true);
      try {
        const data = await getQuote(symbol);
        if (data) {
          setPriceData({
            current: data.c,
            change: data.d,
            percent: data.dp,
          });
        }
      } catch (error) {
        console.error("Error fetching price:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPrice();
    const interval = setInterval(loadPrice, 30000);
    return () => clearInterval(interval);
  }, [symbol]);

  const handlePortfolioToggle = () => {
    if (isInPortfolio) {
      dispatch(removeStock(symbol));
    } else {
      dispatch(
        addStock({
          symbol,
          quantity: 1,
          buyPrice: priceData.current || 0,
        }),
      );
    }
  };

  const isPositive = priceData.change >= 0;

  return (
    <div className="max-w-5xl mx-auto pb-20 md:pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between p-4 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-4xl font-black dark:text-white tracking-tighter">
              {symbol}
            </h1>
            <span className="bg-gray-100 dark:bg-gray-800 text-gray-500 text-xs px-2 py-1 rounded">
              Stock
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-3">
            <span className="text-3xl font-bold dark:text-white">
              {loading ? "---" : `$${priceData.current?.toFixed(2)}`}
            </span>
            <span
              className={`text-sm font-bold ${isPositive ? "text-emerald-500" : "text-red-500"}`}
            >
              {isPositive ? "+" : ""}
              {priceData.change?.toFixed(2)} ({priceData.percent?.toFixed(2)}%)
            </span>
          </div>
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <button
            onClick={() =>
              dispatch(isInWatchlist ? removeWatch(symbol) : addWatch(symbol))
            }
            className={`flex-1 md:flex-none px-6 py-3 rounded-2xl font-bold transition-all ${
              isInWatchlist
                ? "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                : "bg-yellow-400 text-yellow-900 shadow-lg shadow-yellow-400/20"
            }`}
          >
            {isInWatchlist ? "★ Saved" : "☆ Watchlist"}
          </button>
          <button
            onClick={handlePortfolioToggle}
            className={`flex-1 md:flex-none px-6 py-3 rounded-2xl font-bold transition-all text-white shadow-lg ${
              isInPortfolio
                ? "bg-red-500 shadow-red-500/20"
                : "bg-emerald-600 shadow-emerald-600/20"
            }`}
          >
            {isInPortfolio ? "Remove" : "Invest"}
          </button>
        </div>
      </div>

      <div className="px-4 mb-4">
        <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
          {["1D", "1W", "1M", "1Y"].map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                timeframe === t
                  ? "bg-white dark:bg-gray-700 text-emerald-600 dark:text-emerald-400 shadow-sm"
                  : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="px-2 md:px-4">
        <CandlestickChart timeframe={timeframe} />
      </div>

      <div className="mt-8 px-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold dark:text-white">Market News</h3>
          <div className="h-px flex-1 bg-gray-100 dark:bg-gray-800 mx-4"></div>
        </div>
        <div className="bg-white dark:bg-transparent rounded-2xl">
          <NewsFeed symbol={symbol} />
        </div>
      </div>
    </div>
  );
}

export default StockDetails;
