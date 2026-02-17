import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Lock, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [twoFactor, setTwoFactor] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      navigate("/dashboard");
    }, 800);
  };

  return (
    <div className="relative min-h-screen bg-background bg-grid overflow-hidden flex">
      {/* Animated scan line */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="w-full h-px bg-primary/20 animate-scanline" />
      </div>

      {/* Noise overlay */}
      <div className="bg-noise absolute inset-0 pointer-events-none" />

      {/* Left: Branding */}
      <div className="hidden lg:flex flex-1 items-center justify-center relative">
        <div className="relative z-20 px-16">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-10 h-10 text-mint" strokeWidth={1.5} />
          </div>
          <h1 className="font-display text-6xl xl:text-7xl font-bold uppercase tracking-tight text-foreground leading-none">
            TRUSTIX
          </h1>
          <p className="mt-4 font-mono text-sm text-muted-foreground tracking-widest uppercase">
            Banking Fraud Intelligence Platform
          </p>
          <div className="mt-12 flex gap-4">
            <div className="w-16 h-px bg-primary/40" />
            <div className="w-8 h-px bg-primary/20" />
            <div className="w-4 h-px bg-primary/10" />
          </div>
          <div className="mt-8 space-y-2 font-mono text-xs text-muted-foreground">
            <p>■ Real-time threat detection</p>
            <p>■ AI-powered fraud analysis</p>
            <p>■ Network intelligence mapping</p>
          </div>
        </div>
      </div>

      {/* Right: Login Form */}
      <div className="flex-1 flex items-center justify-center relative z-20 p-8">
        <div className="w-full max-w-md">
          {/* Mobile branding */}
          <div className="lg:hidden mb-12 text-center">
            <h1 className="font-display text-4xl font-bold uppercase tracking-tight text-foreground">
              TRUSTIX
            </h1>
            <p className="mt-2 font-mono text-xs text-muted-foreground tracking-widest uppercase">
              Banking Fraud Intelligence Platform
            </p>
          </div>

          <div className="bg-surface border border-border p-8 rounded-sm">
            <div className="flex items-center gap-2 mb-8">
              <Lock className="w-4 h-4 text-muted-foreground" />
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                Secure Access
              </span>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block font-mono text-xs text-muted-foreground uppercase tracking-wider mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-background border border-border px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary transition-colors rounded-sm"
                  placeholder="analyst@institution.com"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-muted-foreground uppercase tracking-wider mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-background border border-border px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary transition-colors rounded-sm pr-12"
                    placeholder="••••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs text-muted-foreground uppercase tracking-wider mb-2">
                  Two-Factor Code
                </label>
                <input
                  type="text"
                  value={twoFactor}
                  onChange={(e) => setTwoFactor(e.target.value)}
                  className="w-full bg-background border border-border px-4 py-3 font-mono text-sm text-foreground tracking-[0.5em] placeholder:tracking-normal placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary transition-colors rounded-sm"
                  placeholder="000000"
                  maxLength={6}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-4 bg-primary text-primary-foreground font-display font-semibold uppercase tracking-widest text-sm py-3.5 rounded-sm hover:glow-mint transition-all duration-150 disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    AUTHENTICATING
                  </span>
                ) : (
                  "SECURE LOGIN"
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-border">
              <p className="font-mono text-xs text-muted-foreground text-center">
                AES-256 encrypted session · SOC 2 Type II compliant
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
