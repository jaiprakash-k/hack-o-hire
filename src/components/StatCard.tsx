interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  severity?: "default" | "danger" | "warning" | "safe";
  delay?: number;
}

const StatCard = ({ label, value, change, severity = "default", delay = 0 }: StatCardProps) => {
  const severityColors = {
    default: "border-border",
    danger: "border-destructive/40",
    warning: "border-warning/40",
    safe: "border-primary/40",
  };

  const valueColors = {
    default: "text-foreground",
    danger: "text-danger",
    warning: "text-warning",
    safe: "text-mint",
  };

  return (
    <div
      className={`bg-surface border ${severityColors[severity]} p-5 rounded-sm opacity-0 animate-slide-up`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-3">
        {label}
      </p>
      <p className={`font-display text-3xl font-bold ${valueColors[severity]}`}>
        {value}
      </p>
      {change && (
        <p className="font-mono text-xs text-muted-foreground mt-2">
          {change}
        </p>
      )}
    </div>
  );
};

export default StatCard;
