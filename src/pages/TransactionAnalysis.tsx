import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

const TransactionAnalysis = () => {
  const [amount, setAmount] = useState("4,500");
  const [location, setLocation] = useState("Lagos, NG");
  const [device, setDevice] = useState("Unknown Android");
  const [time, setTime] = useState("03:42 AM");
  const [analyzed, setAnalyzed] = useState(true);

  const riskScore = 82;
  const anomalies = [
    { label: "Location Anomaly", value: "HIGH", desc: "Transaction origin 4,200km from last known location", color: "text-danger" },
    { label: "Amount Anomaly", value: "MEDIUM", desc: "2.3x above average transaction amount", color: "text-warning" },
    { label: "Device Anomaly", value: "HIGH", desc: "Unrecognized device, first-time usage", color: "text-danger" },
    { label: "Time Anomaly", value: "MEDIUM", desc: "Transaction outside typical activity hours", color: "text-warning" },
  ];

  // Behavior deviation chart data (simplified visual)
  const behaviorData = [
    { day: "Mon", normal: 35, current: 38 },
    { day: "Tue", normal: 42, current: 40 },
    { day: "Wed", normal: 28, current: 31 },
    { day: "Thu", normal: 45, current: 43 },
    { day: "Fri", normal: 50, current: 120 },
    { day: "Sat", normal: 20, current: 15 },
    { day: "Sun", normal: 15, current: 0 },
  ];

  const maxVal = 140;

  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="font-display text-2xl font-bold uppercase tracking-widest text-foreground mb-8">
          Transaction Analysis
        </h1>

        {/* Transaction Input */}
        <div className="bg-surface border border-border rounded-sm p-5 mb-6">
          <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4">
            Transaction Input Simulator
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Amount ($)", val: amount, set: setAmount },
              { label: "Location", val: location, set: setLocation },
              { label: "Device", val: device, set: setDevice },
              { label: "Time", val: time, set: setTime },
            ].map((f) => (
              <div key={f.label}>
                <label className="block font-mono text-[10px] text-muted-foreground uppercase tracking-wider mb-1">
                  {f.label}
                </label>
                <input
                  value={f.val}
                  onChange={(e) => f.set(e.target.value)}
                  className="w-full bg-background border border-border px-3 py-2 font-mono text-sm text-foreground focus:outline-none focus:border-primary transition-colors rounded-sm"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Behavior Deviation Chart */}
          <div className="lg:col-span-2 bg-surface border border-border rounded-sm p-5">
            <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-6">
              Behavior Deviation Graph
            </h3>
            <div className="flex items-end gap-3 h-48">
              {behaviorData.map((d) => (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex gap-0.5 items-end h-40">
                    {/* Normal range */}
                    <div
                      className="flex-1 bg-primary/20 rounded-sm transition-all"
                      style={{ height: `${(d.normal / maxVal) * 100}%` }}
                    />
                    {/* Current */}
                    <div
                      className={`flex-1 rounded-sm transition-all ${
                        d.current > d.normal * 1.5 ? "bg-destructive" : "bg-primary/60"
                      }`}
                      style={{ height: `${(d.current / maxVal) * 100}%` }}
                    />
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground">{d.day}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-6 mt-4">
              <span className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
                <span className="w-3 h-3 bg-primary/20 rounded-sm" /> Normal Range
              </span>
              <span className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
                <span className="w-3 h-3 bg-primary/60 rounded-sm" /> Current
              </span>
              <span className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
                <span className="w-3 h-3 bg-destructive rounded-sm" /> Anomaly
              </span>
            </div>
          </div>

          {/* Risk Panel */}
          <div className="space-y-4">
            {/* Score */}
            <div className="bg-surface border border-destructive/40 rounded-sm p-5">
              <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-2">Risk Score</p>
              <p className="font-display text-5xl font-bold text-danger">{riskScore}</p>
              <p className="font-mono text-xs text-muted-foreground mt-1">/ 100</p>
            </div>

            {/* Anomalies */}
            {anomalies.map((a) => (
              <div key={a.label} className="bg-surface border border-border rounded-sm p-4 opacity-0 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-mono text-xs text-muted-foreground">{a.label}</span>
                  <span className={`font-mono text-xs font-semibold ${a.color}`}>{a.value}</span>
                </div>
                <p className="font-mono text-[10px] text-muted-foreground/60">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TransactionAnalysis;
