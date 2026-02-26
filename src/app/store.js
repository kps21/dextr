import { configureStore } from "@reduxjs/toolkit";
import portfolioReducer from "../features/portfolioSlice";
import watchlistReducer from "../features/watchlistSlice";
import themeReducer from "../features/themeSlice";

export const store = configureStore({
  reducer: {
    portfolio: portfolioReducer,
    watchlist: watchlistReducer,
    theme: themeReducer,
  },
});
