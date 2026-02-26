import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getQuote } from "../services/finnhubService";

/* ================= DEFAULT STOCKS ================= */

const defaultPortfolio = [
  {
    symbol: "AAPL",
    quantity: 5,
    buyPrice: 170,
  },
  {
    symbol: "TSLA",
    quantity: 2,
    buyPrice: 220,
  },
  {
    symbol: "MSFT",
    quantity: 3,
    buyPrice: 310,
  },
];

/* ================= LOCAL STORAGE HELPERS ================= */

const load = () => {
  const stored = JSON.parse(localStorage.getItem("portfolio"));
  if (stored && stored.length > 0) return stored;

  // If no data → initialize with default
  localStorage.setItem("portfolio", JSON.stringify(defaultPortfolio));
  return defaultPortfolio;
};

const save = (data) => {
  localStorage.setItem("portfolio", JSON.stringify(data));
};

/* ================= ASYNC REFRESH ================= */

export const refreshPortfolio = createAsyncThunk(
  "portfolio/refresh",
  async (_, { getState }) => {
    const items = getState().portfolio.items;

    const updated = await Promise.all(
      items.map(async (item) => {
        try {
          const quote = await getQuote(item.symbol);
          if (!quote) return item;

          const current = quote.c;
          const invested = item.buyPrice * item.quantity;
          const value = current * item.quantity;

          return {
            ...item,
            current,
            invested,
            value,
            profit: value - invested,
          };
        } catch (err) {
          console.error("Refresh error:", err);
          return item;
        }
      }),
    );

    // Save refreshed values
    localStorage.setItem("portfolio", JSON.stringify(updated));

    return updated;
  },
);

/* ================= SLICE ================= */

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState: {
    items: load(),
  },
  reducers: {
    addStock: (state, action) => {
      state.items.push(action.payload);
      save(state.items);
    },
    removeStock: (state, action) => {
      state.items = state.items.filter((s) => s.symbol !== action.payload);
      save(state.items);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(refreshPortfolio.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export const { addStock, removeStock } = portfolioSlice.actions;
export default portfolioSlice.reducer;
