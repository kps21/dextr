import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import StockDetails from "./pages/StockDetails";
import Portfolio from "./pages/Portfolio";
import Watchlist from "./pages/Watchlist";
import MarketNews from "./pages/MarketNews";

function App() {
  const theme = useSelector((state) => state.theme.mode);

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stock/:symbol" element={<StockDetails />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/market-news" element={<MarketNews />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
