import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getQuote } from "../services/finnhubService";

const load = () => JSON.parse(localStorage.getItem("portfolio")) || [];
const save = (data) => localStorage.setItem("portfolio", JSON.stringify(data));

export const refreshPortfolio = createAsyncThunk(
  "portfolio/refresh",
  async (_, { getState }) => {
    const items = getState().portfolio.items;

    const updated = await Promise.all(
      items.map(async (item) => {
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
      }),
    );

    return updated;
  },
);

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState: { items: load() },
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
