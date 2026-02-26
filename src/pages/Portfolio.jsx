import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeStock } from "../features/portfolioSlice";
import { getQuote } from "../services/finnhubService";

function Portfolio() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.portfolio);

  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      const priceData = {};

      for (let stock of items) {
        try {
          const data = await getQuote(stock.symbol);
          if (data && data.c) {
            priceData[stock.symbol] = data.c;
          }
        } catch (err) {
          console.error("Price fetch error:", err);
        }
      }

      setPrices(priceData);
      setLoading(false);
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

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 dark:text-gray-100">
        Portfolio
      </h1>

      {items.length === 0 && (
        <p className="text-gray-600 dark:text-gray-300">
          No stocks in portfolio.
        </p>
      )}

      {items.length > 0 && (
        <>
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow mb-8 dark:text-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center ">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Total Invested
                </p>
                <h2 className="text-lg md:text-xl font-bold">
                  ${totalInvested.toFixed(2)}
                </h2>
              </div>

              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Current Value
                </p>
                <h2 className="text-lg md:text-xl font-bold">
                  {loading ? "Loading..." : `$${totalCurrentValue.toFixed(2)}`}
                </h2>
              </div>

              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Profit / Loss
                </p>
                <h2
                  className={`text-lg md:text-xl font-bold ${
                    totalProfit >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {loading ? "Loading..." : `$${totalProfit.toFixed(2)}`}
                </h2>
              </div>
            </div>
          </div>

          <div className="hidden md:block bg-white dark:bg-gray-800 rounded shadow overflow-x-auto dark:text-gray-100">
            <table className="w-full text-left">
              <thead className="border-b dark:border-gray-700">
                <tr>
                  <th className="p-4">Symbol</th>
                  <th className="p-4">Qty</th>
                  <th className="p-4">Buy</th>
                  <th className="p-4">Current</th>
                  <th className="p-4">Value</th>
                  <th className="p-4">P/L</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {items.map((stock) => {
                  const currentPrice = prices[stock.symbol] || 0;
                  const currentValue = stock.quantity * currentPrice;
                  const invested = stock.quantity * stock.buyPrice;
                  const profit = currentValue - invested;

                  return (
                    <tr
                      key={stock.symbol}
                      className="border-b dark:border-gray-700"
                    >
                      <td className="p-4 font-semibold">{stock.symbol}</td>
                      <td className="p-4">{stock.quantity}</td>
                      <td className="p-4">${stock.buyPrice}</td>
                      <td className="p-4">
                        {loading ? "..." : `$${currentPrice}`}
                      </td>
                      <td className="p-4">
                        {loading ? "..." : `$${currentValue.toFixed(2)}`}
                      </td>
                      <td
                        className={`p-4 font-semibold ${
                          profit >= 0 ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {loading ? "..." : `$${profit.toFixed(2)}`}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => dispatch(removeStock(stock.symbol))}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
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

          <div className="md:hidden space-y-4">
            {items.map((stock) => {
              const currentPrice = prices[stock.symbol] || 0;
              const currentValue = stock.quantity * currentPrice;
              const invested = stock.quantity * stock.buyPrice;
              const profit = currentValue - invested;

              return (
                <div
                  key={stock.symbol}
                  className="bg-white dark:bg-gray-800 p-4 rounded shadow"
                >
                  <div className="flex justify-between mb-2">
                    <h2 className="font-bold">{stock.symbol}</h2>
                    <span
                      className={`font-semibold ${
                        profit >= 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {loading ? "..." : `$${profit.toFixed(2)}`}
                    </span>
                  </div>

                  <p className="text-sm">Qty: {stock.quantity}</p>
                  <p className="text-sm">Buy: ${stock.buyPrice}</p>
                  <p className="text-sm">
                    Current: {loading ? "..." : `$${currentPrice}`}
                  </p>
                  <p className="text-sm">
                    Value: {loading ? "..." : `$${currentValue.toFixed(2)}`}
                  </p>

                  <button
                    onClick={() => dispatch(removeStock(stock.symbol))}
                    className="mt-3 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded w-full"
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default Portfolio;
