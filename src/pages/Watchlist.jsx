import { useDispatch, useSelector } from "react-redux";
import { removeWatch } from "../features/watchlistSlice";
import { useNavigate } from "react-router-dom";

function Watchlist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.watchlist);

  if (items.length === 0) {
    return (
      <p className="text-gray-900 dark:text-gray-100">
        No stocks in watchlist.
      </p>
    );
  }

  return (
    <div className="text-gray-900 p-2 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-4">Watchlist</h1>

      {items.map((symbol) => (
        <div
          key={symbol}
          className="bg-emerald-800 hover:bg-emerald-700 
           text-white 
           dark:bg-emerald-500 dark:hover:bg-emerald-800 dark:bg-gray-800 p-4 mb-3 rounded shadow flex justify-between items-center"
        >
          <div
            onClick={() => navigate(`/stock/${symbol}`)}
            className="cursor-pointer font-semibold"
          >
            {symbol}
          </div>

          <button
            onClick={() => dispatch(removeWatch(symbol))}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default Watchlist;
