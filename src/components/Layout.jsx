import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import Footer from "./Footer";

function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/", icon: "📊" },
    { name: "Portfolio", path: "/portfolio", icon: "💼" },
    { name: "Watchlist", path: "/watchlist", icon: "⭐" },
    { name: "Market News", path: "/market-news", icon: "📰" },
  ];

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-[#0a0f1a] transition-colors duration-300">
      <header
        className="hidden md:flex items-center justify-between px-10 py-4 
                        /* Glassmorphism */
                        bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl 
                        border-b border-white/20 dark:border-white/5 
                        sticky top-0 z-40 shadow-lg shadow-black/5"
      >
        <div className="flex items-center gap-2 group cursor-pointer">
          <span className="text-2xl transition-transform group-hover:scale-125 duration-300">
            📈
          </span>
          <h1 className="text-xl font-black bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
            StockPro
          </h1>
        </div>

        <nav className="flex items-center gap-2">
          {menu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-5 py-2 rounded-xl transition-all duration-300 relative group ${
                isActive(item.path)
                  ? "text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10"
                  : "text-gray-600 dark:text-gray-300 hover:text-emerald-500"
              }`}
            >
              {item.name}
              {isActive(item.path) && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-500 rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </header>

      {/* --- MOBILE NAVIGATION BAR (Glassy) --- */}
      <div
        className="md:hidden fixed top-0 left-0 right-0 h-16 
                      bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg 
                      border-b border-white/20 dark:border-white/5 
                      flex items-center justify-between px-6 z-40 shadow-sm"
      >
        <div className="flex items-center gap-2">
          <span className="text-2xl">📈</span>
          <span className="font-bold dark:text-white">StockPro</span>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 text-2xl text-gray-800 dark:text-white active:scale-90 transition-transform"
        >
          ☰
        </button>
      </div>

      {/* --- MOBILE SIDEBAR DRAWER --- */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-500 md:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeMenu}
      >
        <div
          className={`absolute top-0 right-0 h-full w-72 
                     /* Glass sidebar */
                     bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl
                     shadow-2xl transform transition-transform duration-500 ease-out ${
                       isOpen ? "translate-x-0" : "translate-x-full"
                     }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col h-full p-8">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-xl font-black text-gray-800 dark:text-white">
                Explore
              </h2>
              <button
                onClick={closeMenu}
                className="text-2xl text-gray-400 hover:text-red-500 transition-colors"
              >
                ✕
              </button>
            </div>

            <nav className="flex flex-col gap-3">
              {menu.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMenu}
                  className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${
                    isActive(item.path)
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 font-bold scale-105"
                      : "text-gray-600 dark:text-gray-300 hover:bg-emerald-500/10 hover:text-emerald-500"
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="tracking-wide">{item.name}</span>
                </Link>
              ))}
            </nav>

            <div className="mt-auto pt-6 border-t border-gray-200 dark:border-white/10 flex justify-center">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <main className="pt-20 md:pt-8 px-4 md:px-10 max-w-7xl mx-auto">
        {children}
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
