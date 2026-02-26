import { useEffect, useState } from "react";
import { getQuote } from "../services/finnhubService";
import { Link } from "react-router-dom";

const STOCKS = ["AAPL", "MSFT", "TSLA", "NVDA"];

function StockTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    Promise.all(
      STOCKS.map(async (symbol) => {
        const res = await getQuote(symbol);
        return { symbol, ...res.data };
      }),
    ).then(setData);
  }, []);

  return (
    <div className="overflow-x-auto p-4">
      <table
        className="w-full text-sm md:text-base bg-emerald-800 hover:bg-emerald-700 
           text-white 
           dark:bg-emerald-500 dark:hover:bg-emerald-800 dark:bg-gray-800 shadow rounded"
      >
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Price</th>
            <th>Change %</th>
          </tr>
        </thead>
        <tbody>
          {data.map((s) => (
            <tr key={s.symbol} className="text-center border-t">
              <td>
                <Link to={`/stock/${s.symbol}`}>{s.symbol}</Link>
              </td>
              <td>${s.c}</td>
              <td className={s.dp > 0 ? "text-green-500" : "text-red-500"}>
                {s.dp}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StockTable;
