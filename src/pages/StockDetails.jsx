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
          setPriceData({ current: data.c, change: data.d, percent: data.dp });
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
        addStock({ symbol, quantity: 1, buyPrice: priceData.current || 0 }),
      );
    }
  };

  const isPositive = priceData.change >= 0;

  return (
    <div className="max-w-6xl mx-auto pb-20 md:pb-10 pt-4">
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between p-6 gap-6 bg-white/40 dark:bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/40 dark:border-white/10 shadow-2xl mb-6 mx-4 md:mx-0">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter uppercase">
              {symbol}
            </h1>
            <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black px-3 py-1 rounded-full border border-emerald-500/20 tracking-widest uppercase">
              Asset Equity
            </span>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <div className="relative">
              <span className="text-4xl font-bold dark:text-white">
                {loading
                  ? "---"
                  : `$${priceData.current?.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
              </span>
              {!loading && (
                <span className="absolute -right-3 top-1 flex h-2 w-2">
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isPositive ? "bg-emerald-400" : "bg-rose-400"}`}
                  ></span>
                  <span
                    className={`relative inline-flex rounded-full h-2 w-2 ${isPositive ? "bg-emerald-500" : "bg-rose-500"}`}
                  ></span>
                </span>
              )}
            </div>
            <div
              className={`flex items-center px-3 py-1 rounded-xl font-bold text-sm ${isPositive ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"}`}
            >
              {isPositive ? "▲" : "▼"}{" "}
              {Math.abs(priceData.percent || 0).toFixed(2)}%
            </div>
          </div>
        </div>

        {/* --- ACTIONS --- */}
        <div className="flex gap-3">
          <button
            onClick={() =>
              dispatch(isInWatchlist ? removeWatch(symbol) : addWatch(symbol))
            }
            className={`px-6 py-4 rounded-2xl font-black text-sm transition-all duration-300 flex items-center gap-2 ${
              isInWatchlist
                ? "bg-white/50 dark:bg-white/10 text-gray-700 dark:text-gray-200 border border-white/50"
                : "bg-amber-400 text-amber-950 shadow-lg shadow-amber-400/20 hover:scale-105 active:scale-95"
            }`}
          >
            {isInWatchlist ? "★ Saved" : "☆ Watchlist"}
          </button>
          <button
            onClick={handlePortfolioToggle}
            className={`px-8 py-4 rounded-2xl font-black text-sm transition-all duration-300 text-white shadow-xl hover:scale-105 active:scale-95 ${
              isInPortfolio
                ? "bg-rose-500 shadow-rose-500/30"
                : "bg-emerald-600 shadow-emerald-600/30"
            }`}
          >
            {isInPortfolio ? "Exit Position" : "Buy Position"}
          </button>
        </div>
      </div>

      {/* --- CHART CONTROLS --- */}
      <div className="px-4 mb-6">
        <div className="inline-flex bg-white/40 dark:bg-white/5 backdrop-blur-md p-1.5 rounded-2xl border border-white/40 dark:border-white/10 shadow-inner">
          {["1D", "1W", "1M", "1Y"].map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-6 py-2.5 text-xs font-black rounded-xl transition-all duration-300 ${
                timeframe === t
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                  : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* --- CHART --- */}
      <div className="px-4 transition-all duration-500">
        <CandlestickChart timeframe={timeframe} />
      </div>

      {/* --- NEWS SECTION --- */}
      <div className="mt-12 px-4">
        <div className="flex items-center gap-4 mb-8">
          <h3 className="text-2xl font-black dark:text-white tracking-tight shrink-0">
            Market Intelligence
          </h3>
          <div className="h-px w-full bg-gradient-to-r from-gray-200 dark:from-white/10 to-transparent"></div>
        </div>
        <div className="bg-transparent rounded-3xl">
          <NewsFeed symbol={symbol} />
        </div>
      </div>
    </div>
  );
}

export default StockDetails;
