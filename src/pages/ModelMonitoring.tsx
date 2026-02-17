import DashboardLayout from "../components/DashboardLayout";

const metrics = [
  { label: "Model Accuracy", value: "96.3%", trend: [92, 94, 93, 95, 96, 96.3], status: "healthy" },
  { label: "Precision", value: "94.1%", trend: [90, 91, 92, 93, 94, 94.1], status: "healthy" },
  { label: "Recall", value: "91.8%", trend: [88, 89, 90, 91, 91, 91.8], status: "healthy" },
  { label: "False Positive Rate", value: "3.2%", trend: [5, 4.5, 4, 3.8, 3.5, 3.2], status: "healthy" },
];

const deployments = [
  { env: "Production", model: "FraudNet v3.2.1", status: "active", uptime: "99.97%" },
  { env: "Shadow Testing", model: "FraudNet v3.3.0-rc", status: "testing", uptime: "99.94%" },
  { env: "Staging", model: "FraudNet v3.4.0-alpha", status: "staging", uptime: "98.2%" },
];

const statusColors = {
  active: "text-mint bg-primary/10 border-primary/30",
  testing: "text-warning bg-warning/10 border-warning/30",
  staging: "text-muted-foreground bg-muted/50 border-border",
};

const ModelMonitoring = () => {
  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="font-display text-2xl font-bold uppercase tracking-widest text-foreground mb-8">
          Model Monitoring
        </h1>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className="bg-surface border border-border rounded-sm p-5 opacity-0 animate-slide-up"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-3">
                {m.label}
              </p>
              <p className="font-display text-3xl font-bold text-mint mb-4">{m.value}</p>
              {/* Sparkline */}
              <div className="flex items-end gap-1 h-8">
                {m.trend.map((v, j) => {
                  const max = Math.max(...m.trend);
                  const min = Math.min(...m.trend);
                  const range = max - min || 1;
                  const height = ((v - min) / range) * 100;
                  return (
                    <div
                      key={j}
                      className="flex-1 bg-primary/30 rounded-sm"
                      style={{ height: `${Math.max(height, 10)}%` }}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Deployment Status */}
        <div className="bg-surface border border-border rounded-sm">
          <div className="px-5 py-4 border-b border-border">
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-foreground">
              Deployment Status
            </h3>
          </div>
          <div className="divide-y divide-border">
            {deployments.map((d) => (
              <div key={d.env} className="flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-4">
                  <span className={`w-2 h-2 rounded-full ${d.status === "active" ? "bg-primary" : d.status === "testing" ? "bg-warning" : "bg-muted-foreground/40"}`} />
                  <div>
                    <p className="font-display text-sm font-semibold text-foreground">{d.env}</p>
                    <p className="font-mono text-xs text-muted-foreground">{d.model}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-muted-foreground">
                    Uptime: {d.uptime}
                  </span>
                  <span className={`px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider border rounded-sm ${statusColors[d.status as keyof typeof statusColors]}`}>
                    {d.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ModelMonitoring;
