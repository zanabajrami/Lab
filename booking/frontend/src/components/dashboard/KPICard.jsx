import { ArrowUpRight, ArrowDownRight, Info } from "lucide-react";
import { Line } from "react-chartjs-2";

function KPICard({
  title,
  value,
  percent,
  compareLabel,
  sparkline,
  icon: Icon,
}) {
  const isPositive = percent >= 0;

  const data = {
    labels: sparkline.map((_, i) => i),
    datasets: [
      {
        data: sparkline,
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
        borderColor: isPositive ? "#34d399" : "#f43f5e",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    scales: {
      x: { display: false },
      y: { display: false },
    },
  };

  return (
    <div className="relative bg-slate-950 p-6 rounded-[2.5rem] border border-white/5 shadow-2xl hover:bg-slate-900 transition-all">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-indigo-300/50 text-[11px] font-bold uppercase tracking-[0.2em]">
          {title}
        </h2>

        {/* TOOLTIP */}
        <div className="relative group">
          <Info className="w-4 h-4 text-slate-500 cursor-pointer" />
          <div className="absolute right-0 top-6 w-44 text-[10px] bg-slate-900 text-white px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition pointer-events-none">
            Compared to previous period
          </div>
        </div>
      </div>

      {/* VALUE */}
      <p className="text-4xl font-black text-white mt-3 tracking-tighter">
        {value}
      </p>

      {/* CHANGE */}
      <div
        className={`flex items-center gap-1.5 mt-4 text-[10px] font-bold px-3 py-1 rounded-full w-fit uppercase tracking-wider
          ${
            isPositive
              ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
              : "bg-rose-500/10 text-rose-300 border border-rose-500/20"
          }`}
      >
        {isPositive ? (
          <ArrowUpRight className="w-3 h-3" />
        ) : (
          <ArrowDownRight className="w-3 h-3" />
        )}
        {Math.abs(percent)}% vs {compareLabel}
      </div>

      {/* SPARKLINE */}
      <div className="h-[50px] mt-6">
        <Line data={data} options={options} />
      </div>

      {/* ICON */}
      <div
        className={`absolute top-6 right-6 p-4 rounded-2xl
          ${
            isPositive
              ? "bg-emerald-900/40"
              : "bg-rose-900/40"
          }`}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  );
}

export default KPICard;
