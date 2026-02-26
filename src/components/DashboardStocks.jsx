import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getQuote } from "../services/finnhubService";
import Chart from "react-apexcharts";

function DashboardStocks() {
  const { items } = useSelector((state) => state.portfolio);

  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = [];

      for (let stock of items) {
        try {
          const quote = await getQuote(stock.symbol);

          if (quote) {
            data.push({
              symbol: stock.symbol,
              price: quote.c,
              change: quote.d,
              percent: quote.dp,
              high: quote.h,
              low: quote.l,
              volume: quote.v,
            });
          }
        } catch (err) {
          console.log(err);
        }
      }

      setStockData(data);
    };

    if (items.length > 0) fetchData();
  }, [items]);

  if (items.length === 0)
    return (
      <p className="text-gray-500 dark:text-gray-400">No stocks available.</p>
    );

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-2xl shadow-sm overflow-x-auto">
      <table className="w-full text-left">
        <thead className="border-b dark:border-gray-700 text-gray-500 dark:text-gray-400 text-sm">
          <tr>
            <th className="p-4">Company</th>
            <th className="p-4">Market Price</th>
            <th className="p-4">1D Change</th>
            <th className="p-4">Volume</th>
            <th className="p-4">52W Range</th>
            <th className="p-4"></th>
          </tr>
        </thead>

        <tbody>
          {stockData.map((stock) => (
            <tr
              key={stock.symbol}
              className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              <td className="p-4 font-semibold">{stock.symbol}</td>

              <td className="p-4 font-medium">₹{stock.price}</td>

              <td
                className={`p-4 font-semibold ${
                  stock.change >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {stock.change >= 0 ? "+" : ""}
                {stock.change} ({stock.percent}%)
              </td>

              <td className="p-4">{stock.volume?.toLocaleString()}</td>

              <td className="p-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">L</span>
                  <div className="flex-1 h-1 bg-gray-200 dark:bg-gray-600 rounded">
                    <div
                      className="h-1 bg-emerald-500 rounded"
                      style={{
                        width: `${Math.random() * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-xs text-gray-400">H</span>
                </div>
              </td>

              {/* <td className="p-4 flex gap-2">
                <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1 rounded-lg text-sm">
                  B
                </button>
                <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm">
                  S
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DashboardStocks;
