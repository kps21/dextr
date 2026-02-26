import { useEffect, useState } from "react";
import { getQuote } from "../services/finnhubService";

const symbols = ["AAPL", "TSLA", "MSFT", "GOOGL", "AMZN", "NVDA"];

function StockTicker() {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    const fetchPrices = async () => {
      const data = [];

      for (let symbol of symbols) {
        try {
          const quote = await getQuote(symbol);
          if (quote) {
            data.push({
              symbol,
              price: quote.c,
              change: quote.d,
              percent: quote.dp,
            });
          }
        } catch (err) {
          console.log(err);
        }
      }

      setPrices(data);
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm border-b dark:border-gray-700 overflow-hidden">
      <div className="whitespace-nowrap animate-scroll flex gap-8 py-2 px-4">
        {prices.concat(prices).map((stock, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="font-semibold">{stock.symbol}</span>
            <span>${stock.price}</span>
            <span
              className={`text-sm font-medium ${
                stock.change >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {stock.change >= 0 ? "+" : ""}
              {stock.change} ({stock.percent}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StockTicker;
