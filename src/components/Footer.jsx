import { useState } from "react";

const CATEGORIES_DATA = {
  "Share Market": [
    "Top Gainers Stocks",
    "Top Losers Stocks",
    "52 Weeks High",
    "52 Weeks Low",
    "Tata Motors",
    "NHPC",
    "ITC",
    "Wipro",
    "BSE",
    "NTPC",
    "IREDA",
    "SBI",
    "Adani Power",
    "CDSL",
    "Cochin Shipyard",
    "SJVN",
    "Tata Steel",
    "Reliance",
    "HDFC Bank",
    "ICICI Bank",
  ],
  Indices: [
    "NIFTY 50",
    "SENSEX",
    "NIFTY BANK",
    "NIFTY NEXT 50",
    "NIFTY MIDCAP 100",
    "NIFTY PHARMA",
    "NIFTY AUTO",
    "NIFTY IT",
    "NIFTY ENERGY",
    "NIFTY INFRA",
    "INDIA VIX",
    "S&P 500",
    "NASDAQ 100",
    "DOW JONES",
    "GIFT NIFTY",
    "NIFTY 100",
    "NIFTY 500",
    "NIFTY SMALLCAP 100",
    "BSE 100",
    "BSE 500",
  ],
  "F&O": [
    "Option Chain",
    "NIFTY Futures",
    "BANKNIFTY Futures",
    "FINNIFTY Futures",
    "MIDCPNIFTY Futures",
    "Most Active Calls",
    "Most Active Puts",
    "F&O Stocks",
    "OI Analysis",
    "Max Pain",
    "Put Call Ratio (PCR)",
    "FII DII Activity",
    "Intraday Scanners",
    "Short Buildup",
    "Long Buildup",
    "Short Covering",
    "Long Unwinding",
    "Rollover Data",
    "Option Greeks",
    "Margin Calculator",
  ],
  "Mutual Funds": [
    "Direct Mutual Funds",
    "High Return Funds",
    "Tax Saving (ELSS)",
    "Small Cap Funds",
    "Mid Cap Funds",
    "Large Cap Funds",
    "Debt Funds",
    "Hybrid Funds",
    "Index Funds",
    "Liquid Funds",
    "Sectoral Funds",
    "Thematic Funds",
    "International Funds",
    "Best SIP Funds",
    "Low Expense Ratio Funds",
    "Gold Funds",
    "Fund Manager Analysis",
    "New Fund Offers (NFO)",
    "Top Rated Funds",
  ],
  ETFs: [
    "Gold ETF",
    "Nifty 50 ETF",
    "Liquid ETF",
    "Silver ETF",
    "IT ETF",
    "Bank ETF",
    "Junior BeES",
    "International ETF",
    "Pharma ETF",
    "Auto ETF",
    "Midcap ETF",
    "Low Volatility ETF",
    "ESG ETF",
    "Bharat 22 ETF",
    "CPSE ETF",
    "Nasdaq ETF",
    "Hang Seng ETF",
    "Bond ETF",
    "Nifty Next 50 ETF",
  ],
  "Funds By Groww": [
    "Groww Nifty 50 Index",
    "Groww Large Cap",
    "Groww ELSS Tax Saver",
    "Groww Aggressive Hybrid",
    "Groww Value Fund",
    "Groww Overnight Fund",
    "Groww Banking & Financial",
    "Groww Small Cap Fund",
    "Groww Mid Cap Fund",
    "Groww Dynamic Bond Fund",
    "Groww Ultra Short Term",
    "Groww Equity Savings",
    "Groww Flexi Cap Fund",
    "Groww Arbitrage Fund",
    "Groww Money Market",
  ],
  Calculators: [
    "SIP Calculator",
    "Lumpsum Calculator",
    "SWP Calculator",
    "EMI Calculator",
    "Income Tax Calculator",
    "PPF Calculator",
    "EPF Calculator",
    "Step Up SIP",
    "Home Loan EMI",
    "Car Loan EMI",
    "Brokerage Calculator",
    "Margin Calculator",
    "Fixed Deposit (FD)",
    "Recurring Deposit (RD)",
    "NPS Calculator",
    "Retirement Calculator",
    "Mutual Fund Returns",
    "Gratuity Calculator",
    "HRA Calculator",
  ],
  IPO: [
    "Open IPO",
    "Upcoming IPO",
    "Closed IPO",
    "IPO GMP",
    "SME IPO",
    "Listing Gains",
    "Subscription Status",
    "IPO Performance",
    "IPO Calendar",
    "How to Apply",
    "IPO Forms",
    "Allotment Status",
    "Red Herring Prospectus",
    "IPO FAQs",
    "SME IPO Listing",
    "Mainboard IPOs",
    "Buyback of Shares",
    "Rights Issue",
  ],
  Miscellaneous: [
    "About Us",
    "Pricing",
    "Help & Support",
    "Investor Relations",
    "Gold Rates",
    "Silver Rates",
    "Fixed Deposit",
    "Glossary",
    "Stock Sectors",
    "Market Calendar",
    "Press Releases",
    "Careers",
    "Sitemap",
    "Contact Us",
    "Resource Center",
    "Security",
    "Privacy Policy",
    "Terms of Use",
    "Disclaimer",
  ],
};

function Footer() {
  const [activeCategory, setActiveCategory] = useState("Share Market");
  const currentLinks = CATEGORIES_DATA[activeCategory] || [];

  return (
    <footer className="relative mt-2 transition-all duration-300">
      <div className="absolute inset-0 bg-gray-50/50 dark:bg-[#0a0f1a]/80 backdrop-blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex overflow-x-auto no-scrollbar gap-8 border-b border-gray-200 dark:border-white/5 pb-4 mb-8">
          {Object.keys(CATEGORIES_DATA).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-sm font-bold transition-all duration-300 whitespace-nowrap relative pb-4 ${
                activeCategory === cat
                  ? "text-emerald-500"
                  : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-4 gap-x-12 min-h-[200px]">
          {currentLinks.map((item, idx) => (
            <div
              key={idx}
              className="group flex items-center gap-2 cursor-pointer py-1"
            >
              <div className="w-1 h-1 rounded-full bg-emerald-500/0 group-hover:bg-emerald-500 transition-all duration-300" />
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 group-hover:text-emerald-500 transition-colors duration-200">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white/40 dark:bg-black/20 backdrop-blur-md border-t border-gray-200 dark:border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            <div className="text-center lg:text-left">
              <div className="font-black text-2xl tracking-tighter text-gray-900 dark:text-white mb-2">
                Stock<span className="text-emerald-500">Pro</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed font-medium">
                Master the markets with real-time data and analytics. Built for
                the next generation of investors.
                <span className="block mt-1 font-bold opacity-60">
                  © 2016–2026. All rights reserved.
                </span>
              </p>
            </div>

            {/* FIXED SECTION: Using spans/buttons instead of anchor tags with # */}
            <div className="flex flex-wrap justify-center gap-y-3 gap-x-6 text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">
              {[
                "NSE",
                "BSE",
                "MCX",
                "Privacy Policy",
                "Terms & Conditions",
                "Disclosures",
              ].map((link) => (
                <button
                  key={link}
                  type="button"
                  className="hover:text-emerald-500 transition-colors duration-300 border-b border-transparent hover:border-emerald-500/30 pb-1 cursor-pointer outline-none"
                >
                  {link}
                </button>
              ))}
            </div>

            <div className="flex gap-4 opacity-50 grayscale hover:grayscale-0 transition-all">
              <span className="px-3 py-1 rounded border border-gray-400 dark:border-white/10 text-[9px] font-bold dark:text-white">
                SEBI REGISTERED
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
