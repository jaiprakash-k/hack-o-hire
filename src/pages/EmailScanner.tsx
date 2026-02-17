import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

const EmailScanner = () => {
  const [emailContent, setEmailContent] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const handleAnalyze = () => {
    if (!emailContent.trim()) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalyzed(true);
    }, 1500);
  };

  const riskScore = 78;

  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="font-display text-2xl font-bold uppercase tracking-widest text-foreground mb-8">
          Email Scanner
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Email Input */}
          <div className="bg-surface border border-border rounded-sm p-6">
            <label className="block font-mono text-xs text-muted-foreground uppercase tracking-widest mb-3">
              Paste Suspicious Email
            </label>
            <textarea
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              className="w-full h-72 bg-background border border-border rounded-sm p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground/30 resize-none focus:outline-none focus:border-primary transition-colors"
              placeholder="Paste email headers and body content here..."
            />
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !emailContent.trim()}
              className="mt-4 w-full bg-primary text-primary-foreground font-display font-semibold uppercase tracking-widest text-sm py-3 rounded-sm hover:glow-mint transition-all disabled:opacity-30"
            >
              {isAnalyzing ? "ANALYZING..." : "RUN ANALYSIS"}
            </button>
          </div>

          {/* Right: Analysis Panel */}
          <div className="space-y-4">
            {analyzed ? (
              <>
                {/* Metrics */}
                <div className="bg-surface border border-border rounded-sm p-5 opacity-0 animate-slide-up">
                  <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4">
                    Analysis Results
                  </h3>
                  <div className="space-y-4">
                    {[
                      { label: "AI Fraud Probability", value: "78%", color: "text-danger" },
                      { label: "Urgency Score", value: "HIGH", color: "text-warning" },
                      { label: "Credential Request", value: "DETECTED", color: "text-danger" },
                      { label: "Writing Style Mismatch", value: "92%", color: "text-danger" },
                    ].map((m) => (
                      <div key={m.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                        <span className="font-mono text-xs text-muted-foreground">{m.label}</span>
                        <span className={`font-mono text-sm font-semibold ${m.color}`}>{m.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Risk Meter */}
                <div className="bg-surface border border-border rounded-sm p-5 opacity-0 animate-slide-up stagger-2">
                  <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4">
                    Fraud Risk Meter
                  </h3>
                  <div className="flex gap-1 h-6">
                    {Array.from({ length: 20 }).map((_, i) => {
                      const threshold = (i + 1) * 5;
                      const filled = threshold <= riskScore;
                      const color = threshold <= 30 ? "bg-primary" : threshold <= 60 ? "bg-warning" : "bg-destructive";
                      return (
                        <div
                          key={i}
                          className={`flex-1 rounded-sm transition-colors ${filled ? color : "bg-muted"}`}
                        />
                      );
                    })}
                  </div>
                  <div className="flex justify-between mt-2 font-mono text-[10px] text-muted-foreground">
                    <span>LOW</span>
                    <span>MEDIUM</span>
                    <span>HIGH</span>
                    <span>CRITICAL</span>
                  </div>
                </div>

                {/* Explainability */}
                <div className="bg-surface border border-border rounded-sm p-5 opacity-0 animate-slide-up stagger-3">
                  <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4">
                    AI Explainability
                  </h3>
                  <p className="font-serif text-sm text-foreground/80 leading-relaxed">
                    This email exhibits multiple high-risk indicators consistent with credential phishing attacks.
                    The writing style deviates significantly from the purported sender's established communication
                    patterns. A direct request for authentication credentials was detected in the body, combined
                    with artificially elevated urgency language. The sender domain shows a 2-character deviation
                    from the legitimate institutional domain, suggesting a typosquatting attack vector.
                  </p>
                </div>
              </>
            ) : (
              <div className="bg-surface border border-border rounded-sm p-12 flex items-center justify-center h-full">
                <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                  Awaiting email input
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmailScanner;
