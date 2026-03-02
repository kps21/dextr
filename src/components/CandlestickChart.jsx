import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import Chart from "react-apexcharts";
import { generateMockCandles } from "../services/mockCandleService";

function CandlestickChart({ timeframe }) {
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";

  const series = useMemo(() => generateMockCandles(timeframe), [timeframe]);

  const options = {
    chart: {
      type: "candlestick",
      background: "transparent",
      toolbar: { show: false },
      fontFamily: "Inter, sans-serif",
      sparkline: { enabled: false },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
      },
      dropShadow: {
        enabled: isDark,
        top: 0,
        left: 0,
        blur: 10,
        opacity: 0.1,
        color: "#10b981",
      },
    },
    theme: { mode: isDark ? "dark" : "light" },
    grid: {
      show: true,
      borderColor: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
      strokeDashArray: 6,
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } },
      padding: { top: 10, bottom: 10, left: 10, right: 10 },
    },
    xaxis: {
      type: "datetime",
      labels: {
        style: {
          colors: isDark ? "#9ca3af" : "#6b7280",
          fontSize: "11px",
          fontWeight: 500,
        },
        datetimeUTC: false,
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      opposite: true,
      labels: {
        style: {
          colors: isDark ? "#9ca3af" : "#6b7280",
          fontSize: "11px",
          fontWeight: 600,
        },
        formatter: (val) => `$${val.toLocaleString()}`,
      },
    },
    tooltip: {
      theme: isDark ? "dark" : "light",
      x: { format: "dd MMM yyyy HH:mm" },
      style: { fontSize: "12px" },
      custom: undefined,
    },
    plotOptions: {
      candlestick: {
        colors: {
          positive: "#10b981",
          negative: "#f43f5e",
        },
        wick: { useFillColor: true },
      },
    },
  };

  return (
    <div
      className="relative group overflow-hidden
                    /* Glass Container */
                    bg-white/40 dark:bg-white/5 backdrop-blur-xl 
                    p-3 md:p-6 rounded-[2rem] 
                    border border-white/40 dark:border-white/10 
                    shadow-2xl transition-all duration-500"
    >
      {/* Decorative Gradient Glow */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/10 blur-[100px] pointer-events-none" />

      <div className="flex justify-between items-center mb-6 px-2">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/20">
            <span className="text-emerald-500 text-sm">📈</span>
          </div>
          <h3 className="font-black text-gray-800 dark:text-white tracking-tight">
            Market Analysis
          </h3>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 rounded-full bg-gray-500/10 text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
            {timeframe} Data
          </span>
        </div>
      </div>

      <Chart
        options={options}
        series={series}
        type="candlestick"
        height={400}
      />
    </div>
  );
}

export default React.memo(CandlestickChart);
