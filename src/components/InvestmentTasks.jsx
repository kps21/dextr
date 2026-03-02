import React from "react";

const tasks = [
  "Review underperforming stocks",
  "Rebalance portfolio allocation",
  "Check AAPL earnings tomorrow",
  "Add SIP for mutual fund",
];

function InvestmentTasks() {
  return (
    <div className="bg-white/40 mt-4 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-2xl p-6">
      <h2 className="text-lg font-bold mb-4 dark:text-white">
        📝 Investment Tasks
      </h2>

      <ul className="space-y-2">
        {tasks.map((task, index) => (
          <li
            key={index}
            className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
          >
            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
            {task}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InvestmentTasks;
