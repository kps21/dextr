import React from "react";

const events = [
  { id: 1, event: "US CPI Data", date: "Tomorrow" },
  { id: 2, event: "FOMC Meeting", date: "Friday" },
  { id: 3, event: "RBI Policy Decision", date: "Next Week" },
];

function EconomicCalendar() {
  return (
    <div className="bg-white/40 mt-4 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-2xl p-6">
      <h2 className="text-lg font-bold mb-4 dark:text-white">
        📅 Economic Calendar
      </h2>

      <div className="space-y-3">
        {events.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center p-3 rounded-lg bg-gray-100 dark:bg-gray-800"
          >
            <span className="text-sm font-medium dark:text-white">
              {item.event}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {item.date}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EconomicCalendar;
