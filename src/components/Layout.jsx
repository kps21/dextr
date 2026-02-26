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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <header className="hidden md:flex items-center justify-between px-10 py-4 bg-emerald-700 dark:bg-gray-800 text-white shadow-md sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📈</span>
          <h1 className="text-xl font-bold">StockPro</h1>
        </div>

        <nav className="flex items-center gap-6">
          {menu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-lg transition ${
                isActive(item.path)
                  ? "bg-white/20 font-semibold"
                  : "hover:bg-white/10 opacity-90"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <ThemeToggle />
      </header>

      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-emerald-700 dark:bg-gray-800 text-white flex items-center justify-between px-4 z-40 shadow-md">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📈</span>
          <span className="font-bold">StockPro</span>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 text-2xl focus:outline-none"
        >
          ☰
        </button>
      </div>

      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeMenu}
      >
        <div
          className={`absolute top-0 left-0 h-full w-72 bg-white dark:bg-gray-800 shadow-2xl transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col h-full p-6">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-xl font-bold dark:text-white">Menu</h2>
              <button onClick={closeMenu} className="text-2xl dark:text-white">
                ✕
              </button>
            </div>

            <nav className="flex flex-col gap-4">
              {menu.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMenu}
                  className={`flex items-center gap-4 p-4 rounded-xl text-lg ${
                    isActive(item.path)
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 font-bold"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <span>{item.icon}</span> {item.name}
                </Link>
              ))}
            </nav>

            <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-700">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      <main className="pt-16 md:pt-6 px-4 md:px-10">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
