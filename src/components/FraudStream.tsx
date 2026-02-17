const fraudData = [
  { time: "14:32:08", userId: "USR-4821", risk: 94, action: "Auto-blocked", status: "BLOCKED" as const },
  { time: "14:31:55", userId: "USR-7734", risk: 12, action: "Approved", status: "SAFE" as const },
  { time: "14:31:42", userId: "USR-3309", risk: 67, action: "Flagged for review", status: "REVIEW" as const },
  { time: "14:31:28", userId: "USR-9012", risk: 88, action: "Auto-blocked", status: "BLOCKED" as const },
  { time: "14:31:15", userId: "USR-1156", risk: 23, action: "Approved", status: "SAFE" as const },
  { time: "14:30:58", userId: "USR-6643", risk: 71, action: "Flagged for review", status: "REVIEW" as const },
  { time: "14:30:44", userId: "USR-8890", risk: 45, action: "Flagged for review", status: "REVIEW" as const },
  { time: "14:30:31", userId: "USR-2217", risk: 8, action: "Approved", status: "SAFE" as const },
  { time: "14:30:18", userId: "USR-5501", risk: 96, action: "Auto-blocked", status: "BLOCKED" as const },
  { time: "14:30:05", userId: "USR-3378", risk: 33, action: "Approved", status: "SAFE" as const },
];

const statusStyles = {
  BLOCKED: "text-danger bg-destructive/10 border-destructive/30",
  REVIEW: "text-warning bg-warning/10 border-warning/30",
  SAFE: "text-mint bg-primary/10 border-primary/30",
};

const rowHoverStyles = {
  BLOCKED: "hover:bg-destructive/5",
  REVIEW: "hover:bg-warning/5",
  SAFE: "hover:bg-primary/5",
};

const borderLeft = {
  BLOCKED: "border-l-2 border-l-destructive/60",
  REVIEW: "border-l-2 border-l-warning/40",
  SAFE: "border-l-2 border-l-primary/40",
};

const FraudStream = () => {
  return (
    <div className="bg-surface border border-border rounded-sm">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-foreground">
          Real-Time Fraud Stream
        </h3>
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="font-mono text-xs text-muted-foreground">LIVE</span>
        </span>
      </div>

      <div className="divide-y divide-border max-h-[400px] overflow-y-auto">
        {fraudData.map((item, i) => (
          <div
            key={i}
            className={`flex items-center gap-4 px-5 py-3 font-mono text-xs transition-colors ${rowHoverStyles[item.status]} ${borderLeft[item.status]}`}
          >
            <span className="text-muted-foreground w-16 shrink-0">{item.time}</span>
            <span className="text-foreground w-20 shrink-0">{item.userId}</span>
            <span className={`w-8 text-right shrink-0 font-semibold ${item.risk > 70 ? "text-danger" : item.risk > 40 ? "text-warning" : "text-mint"}`}>
              {item.risk}
            </span>
            <span className="text-muted-foreground flex-1 truncate">{item.action}</span>
            <span className={`px-2 py-0.5 text-[10px] uppercase tracking-wider border rounded-sm ${statusStyles[item.status]}`}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FraudStream;
