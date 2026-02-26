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
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 mt-16 transition-all duration-300 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex overflow-x-auto no-scrollbar md:flex-wrap gap-6 border-b border-gray-300 dark:border-gray-700 pb-4 mb-2 text-sm font-medium">
          {Object.keys(CATEGORIES_DATA).map((cat) => (
            <span
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`cursor-pointer transition-all duration-200 whitespace-nowrap ${
                activeCategory === cat
                  ? "text-emerald-600 border-b-2 border-emerald-600 pb-2"
                  : "hover:text-emerald-500 text-gray-500 dark:text-gray-400"
              }`}
            >
              {cat}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-1 gap-x-8 text-sm ">
          {currentLinks.map((item, idx) => (
            <div
              key={idx}
              className="hover:text-emerald-500 cursor-pointer transition-colors duration-150 py-1 opacity-85 hover:opacity-100"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-gray-300 dark:border-gray-700 py-8 bg-white/50 dark:bg-black/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="font-semibold text-lg tracking-tight">
              Stock<span className="text-emerald-600">Pro</span>
              <span className="block text-xs font-normal text-gray-500">
                © 2016–2026. All rights reserved.
              </span>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-xs font-medium">
              {[
                "NSE",
                "BSE",
                "MCX",
                "Privacy Policy",
                "Terms & Conditions",
                "Disclosures",
              ].map((link, i, arr) => (
                <div key={link} className="flex items-center gap-4">
                  <span className="cursor-pointer hover:text-emerald-500 transition-colors uppercase">
                    {link}
                  </span>
                  {i !== arr.length - 1 && (
                    <span className="text-gray-400 dark:text-gray-600">|</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
