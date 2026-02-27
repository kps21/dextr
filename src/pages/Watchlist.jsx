import { useDispatch, useSelector } from "react-redux";
import { removeWatch } from "../features/watchlistSlice";
import { useNavigate } from "react-router-dom";

function Watchlist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.watchlist);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* --- HEADER --- */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Watchlist
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            {items.length} {items.length === 1 ? "asset" : "assets"} being
            monitored
          </p>
        </div>
        <div className="p-3 bg-amber-500/10 rounded-2xl">
          <span className="text-2xl">⭐</span>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 bg-white/40 dark:bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-dashed border-gray-300 dark:border-white/10">
          <p className="text-gray-500 dark:text-gray-400 font-medium">
            Your watchlist is currently empty.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 text-emerald-500 font-bold text-sm hover:underline"
          >
            Explore Markets →
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {items.map((symbol) => (
            <div
              key={symbol}
              className="group relative overflow-hidden transition-all duration-300
                         /* Glass Design */
                         bg-white/40 dark:bg-white/5 backdrop-blur-xl 
                         border border-white/40 dark:border-white/10 
                         p-5 rounded-2xl flex justify-between items-center
                         hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-1"
            >
              {/* Clickable Area for Navigation */}
              <div
                onClick={() => navigate(`/stock/${symbol}`)}
                className="flex items-center gap-4 cursor-pointer flex-1"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center font-black text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                  {symbol[0]}
                </div>
                <div>
                  <h2 className="text-xl font-black text-gray-800 dark:text-white">
                    {symbol}
                  </h2>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">
                    View Insights
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => dispatch(removeWatch(symbol))}
                className="relative z-10 px-4 py-2 rounded-xl bg-rose-500/10 text-rose-500 text-xs font-bold 
                           hover:bg-rose-500 hover:text-white transition-all duration-300 active:scale-90"
              >
                Remove
              </button>

              {/* Decorative Shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Watchlist;
