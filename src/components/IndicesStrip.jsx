export const IndicesStrip = () => {
  const indices = [
    { name: "S&P 500", value: "5,024.10", change: "+0.45%" },
    { name: "NASDAQ", value: "16,012.20", change: "-0.12%" },
    { name: "DOW J", value: "38,230.50", change: "+0.22%" },
  ];

  return (
    <div className="flex gap-4 overflow-x-auto no-scrollbar py-2 mb-6">
      {indices.map((idx) => (
        <div
          key={idx.name}
          className="flex-1 min-w-[140px] p-3 rounded-xl bg-white/30 dark:bg-white/5 border border-white/20 dark:border-white/10"
        >
          <p className="text-[10px] font-black text-gray-500 uppercase">
            {idx.name}
          </p>
          <div className="flex justify-between items-baseline">
            <span className="text-sm font-bold dark:text-white">
              {idx.value}
            </span>
            <span
              className={`text-[10px] ${idx.change.startsWith("+") ? "text-emerald-500" : "text-rose-500"}`}
            >
              {idx.change}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
