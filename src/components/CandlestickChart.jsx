import React from "react";
import { useSelector } from "react-redux";
import Chart from "react-apexcharts";
import { generateMockCandles } from "../services/mockCandleService";

function CandlestickChart({ timeframe }) {
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";

  const series = generateMockCandles(timeframe);

  const options = {
    chart: {
      type: "candlestick",
      background: "transparent",
      toolbar: { show: false },
      sparkline: { enabled: false },
      animations: { enabled: true },
    },
    theme: { mode: isDark ? "dark" : "light" },
    grid: {
      borderColor: isDark ? "#374151" : "#f3f4f6",
      strokeDashArray: 4,
      padding: { left: 0, right: 0 },
    },
    xaxis: {
      type: "datetime",
      labels: {
        style: { colors: isDark ? "#9ca3af" : "#6b7280", fontSize: "10px" },
        datetimeUTC: false,
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      opposite: true,
      labels: {
        style: { colors: isDark ? "#9ca3af" : "#6b7280", fontSize: "10px" },
        formatter: (val) => `$${val.toFixed(2)}`,
      },
    },
    tooltip: {
      theme: isDark ? "dark" : "light",
      x: { format: "dd MMM yyyy" },
    },
    plotOptions: {
      candlestick: {
        colors: {
          positive: "#10b981",
          negative: "#ef4444",
        },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-2 md:p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
      <Chart
        options={options}
        series={series}
        type="candlestick"
        height={window.innerWidth < 768 ? 280 : 400}
      />
    </div>
  );
}

export default React.memo(CandlestickChart);
