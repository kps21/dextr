import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeStock } from "../features/portfolioSlice";
import { getQuote } from "../services/finnhubService";
import InvestmentTasks from "../components/InvestmentTasks";
import TrendingStocks from "../components/TrendingStocks";

function Portfolio() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.portfolio);

  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      setLoading(true);
      const priceData = {};

      try {
        await Promise.all(
          items.map(async (stock) => {
            const data = await getQuote(stock.symbol);
            if (data && data.c) {
              priceData[stock.symbol] = data.c;
            }
          }),
        );
        setPrices(priceData);
      } catch (err) {
        console.error("Price fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (items.length > 0) fetchPrices();
    else setLoading(false);
  }, [items]);

  const totalInvested = items.reduce(
    (acc, stock) => acc + stock.quantity * stock.buyPrice,
    0,
  );
  const totalCurrentValue = items.reduce((acc, stock) => {
    const currentPrice = prices[stock.symbol] || 0;
    return acc + stock.quantity * currentPrice;
  }, 0);

  const totalProfit = totalCurrentValue - totalInvested;
  const profitPercentage =
    totalInvested > 0 ? (totalProfit / totalInvested) * 100 : 0;

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Your Portfolio
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Real-time performance overview
          </p>
        </div>
        <div className="px-4 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
          Live Tracking Active
        </div>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 bg-white/40 dark:bg-white/5 backdrop-blur-md rounded-3xl border border-dashed border-gray-300 dark:border-white/10">
          <span className="text-5xl block mb-4">💼</span>
          <p className="text-gray-500 dark:text-gray-400">
            Your portfolio is empty. Start adding some stocks!
          </p>
        </div>
      ) : (
        <>
          {/* --- SUMMARY CARDS --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              {
                label: "Total Invested",
                value: totalInvested,
                color: "text-gray-800 dark:text-white",
              },
              {
                label: "Current Value",
                value: totalCurrentValue,
                color: "text-emerald-600 dark:text-emerald-400",
                isPrice: true,
              },
              { label: "Total Profit/Loss", value: totalProfit, isPL: true },
            ].map((card, i) => (
              <div
                key={i}
                className="bg-white/50 dark:bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/40 dark:border-white/10 shadow-xl"
              >
                <p className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">
                  {card.label}
                </p>
                <h2
                  className={`text-2xl font-black ${card.isPL ? (card.value >= 0 ? "text-green-500" : "text-red-500") : card.color}`}
                >
                  {loading && card.isPrice
                    ? "Fetching..."
                    : `$${Math.abs(card.value).toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
                  {card.isPL && (
                    <span className="text-sm ml-2 font-medium">
                      ({profitPercentage.toFixed(2)}%)
                    </span>
                  )}
                </h2>
              </div>
            ))}
          </div>

          {/* --- DESKTOP TABLE --- */}
          <div className="hidden md:block bg-white/40 dark:bg-white/5 backdrop-blur-xl rounded-3xl border border-white/40 dark:border-white/10 shadow-2xl overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-500/5 dark:bg-white/5 text-gray-500 dark:text-gray-400 text-[11px] uppercase tracking-tighter font-bold">
                  <th className="p-5">Asset</th>
                  <th className="p-5 text-center">Quantity</th>
                  <th className="p-5">Avg Buy</th>
                  <th className="p-5">Current</th>
                  <th className="p-5">Market Value</th>
                  <th className="p-5">Profit/Loss</th>
                  <th className="p-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-white/5">
                {items.map((stock) => {
                  const currentPrice = prices[stock.symbol] || 0;
                  const currentValue = stock.quantity * currentPrice;
                  const profit = currentValue - stock.quantity * stock.buyPrice;
                  const isPositive = profit >= 0;

                  return (
                    <tr
                      key={stock.symbol}
                      className="hover:bg-emerald-500/5 transition-colors group"
                    >
                      <td className="p-5">
                        <span className="font-black text-gray-800 dark:text-white group-hover:text-emerald-500 transition-colors">
                          {stock.symbol}
                        </span>
                      </td>
                      <td className="p-5 text-center font-medium dark:text-gray-300">
                        {stock.quantity}
                      </td>
                      <td className="p-5 font-medium dark:text-gray-300">
                        ${stock.buyPrice.toFixed(2)}
                      </td>
                      <td className="p-5 font-medium text-emerald-600 dark:text-emerald-400">
                        {loading ? (
                          <span className="animate-pulse">...</span>
                        ) : (
                          `$${currentPrice.toFixed(2)}`
                        )}
                      </td>
                      <td className="p-5 font-bold dark:text-white">
                        {loading ? "..." : `$${currentValue.toFixed(2)}`}
                      </td>
                      <td
                        className={`p-5 font-bold ${isPositive ? "text-green-500" : "text-red-500"}`}
                      >
                        {loading
                          ? "..."
                          : `${isPositive ? "+" : ""}$${profit.toFixed(2)}`}
                      </td>
                      <td className="p-5 text-right">
                        <button
                          onClick={() => dispatch(removeStock(stock.symbol))}
                          className="px-4 py-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all text-xs font-bold"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* --- MOBILE CARDS --- */}
          <div className="md:hidden space-y-4">
            {items.map((stock) => {
              const currentPrice = prices[stock.symbol] || 0;
              const profit =
                stock.quantity * currentPrice - stock.quantity * stock.buyPrice;
              return (
                <div
                  key={stock.symbol}
                  className="bg-white/50 dark:bg-white/5 backdrop-blur-md p-5 rounded-3xl border border-white/40 dark:border-white/10"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="font-black text-xl text-gray-800 dark:text-white">
                      {stock.symbol}
                    </h2>
                    <div
                      className={`px-3 py-1 rounded-lg text-xs font-bold ${profit >= 0 ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}`}
                    >
                      {profit >= 0 ? "▲" : "▼"} ${Math.abs(profit).toFixed(2)}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <span className="text-gray-500">Quantity:</span>{" "}
                    <span className="text-right font-bold dark:text-white">
                      {stock.quantity}
                    </span>
                    <span className="text-gray-500">Avg Buy:</span>{" "}
                    <span className="text-right font-bold dark:text-white">
                      ${stock.buyPrice}
                    </span>
                    <span className="text-gray-500">Current:</span>{" "}
                    <span className="text-right font-bold text-emerald-500">
                      ${currentPrice}
                    </span>
                  </div>
                  <button
                    onClick={() => dispatch(removeStock(stock.symbol))}
                    className="mt-4 w-full py-3 rounded-2xl bg-red-500/10 text-red-500 font-bold text-sm"
                  >
                    Remove Asset
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}
      <TrendingStocks />
      <InvestmentTasks />
    </div>
  );
}

export default Portfolio;
