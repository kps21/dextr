import axiosInstance from "./axiosInstance";
import { mockNews } from "./mockNews";

const API_KEY = "d6fbme1r01qvn4o2i8sgd6fbme1r01qvn4o2i8t0";

export const getQuote = async (symbol) => {
  try {
    const res = await axiosInstance.get("/quote", {
      params: { symbol, token: API_KEY },
    });
    return res.data;
  } catch (error) {
    console.error("Quote error:", error.response?.data);
    return null;
  }
};

export const getMarketNews = async () => {
  try {
    const res = await axiosInstance.get("/news", {
      params: {
        category: "general",
        token: API_KEY,
      },
    });

    if (!res.data || res.data.length === 0) {
      return mockNews;
    }

    return res.data;
  } catch (error) {
    console.error("News error:", error);
    return mockNews;
  }
};

export const getNews = async (symbol) => {
  try {
    if (symbol.includes(".")) return [];

    const res = await axiosInstance.get("/company-news", {
      params: {
        symbol,
        from: "2024-01-01",
        to: "2024-12-31",
        token: API_KEY,
      },
    });

    return res.data;
  } catch (error) {
    console.error("News error:", error.response?.data);
    return [];
  }
};

export const searchStock = async (query) => {
  try {
    const res = await axiosInstance.get("/search", {
      params: { q: query, token: API_KEY },
    });
    return res.data.result;
  } catch {
    return [];
  }
};
