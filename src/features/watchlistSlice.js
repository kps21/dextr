import { createSlice } from "@reduxjs/toolkit";

/* ================= DEFAULT WATCHLIST ================= */

const defaultWatchlist = ["NVDA", "AMZN", "GOOGL"];

/* ================= LOCAL STORAGE HELPERS ================= */

const load = () => {
  const stored = JSON.parse(localStorage.getItem("watchlist"));
  if (stored && stored.length > 0) return stored;

  localStorage.setItem("watchlist", JSON.stringify(defaultWatchlist));
  return defaultWatchlist;
};

const save = (data) => {
  localStorage.setItem("watchlist", JSON.stringify(data));
};

/* ================= SLICE ================= */

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: {
    items: load(),
  },
  reducers: {
    addWatch: (state, action) => {
      if (!state.items.includes(action.payload)) {
        state.items.push(action.payload);
        save(state.items);
      }
    },
    removeWatch: (state, action) => {
      state.items = state.items.filter((s) => s !== action.payload);
      save(state.items);
    },
  },
});

export const { addWatch, removeWatch } = watchlistSlice.actions;
export default watchlistSlice.reducer;
