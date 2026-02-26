import { createSlice } from "@reduxjs/toolkit";

const load = () => JSON.parse(localStorage.getItem("watchlist")) || [];
const save = (data) => localStorage.setItem("watchlist", JSON.stringify(data));

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: { items: load() },
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
