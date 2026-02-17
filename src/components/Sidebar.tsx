import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Mail,
  Globe,
  Mic,
  ArrowLeftRight,
  Share2,
  Bell,
  Activity,
  Settings,
  Shield,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Mail, label: "Email Scanner", path: "/email-scanner" },
  { icon: Globe, label: "Website Scanner", path: "/dashboard" },
  { icon: Mic, label: "Voice Analysis", path: "/dashboard" },
  { icon: ArrowLeftRight, label: "Transactions", path: "/transactions" },
  { icon: Share2, label: "Fraud Network", path: "/fraud-network" },
  { icon: Bell, label: "Alerts", path: "/dashboard" },
  { icon: Activity, label: "Model Monitoring", path: "/model-monitoring" },
  { icon: Settings, label: "Settings", path: "/dashboard" },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed left-0 top-0 h-screen w-16 bg-card border-r border-border z-50 flex flex-col items-center py-4">
      {/* Logo */}
      <button onClick={() => navigate("/dashboard")} className="mb-8 p-2">
        <Shield className="w-6 h-6 text-mint" strokeWidth={1.5} />
      </button>

      {/* Nav items */}
      <div className="flex-1 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <div key={item.label} className="relative group">
              <button
                onClick={() => navigate(item.path)}
                className={`w-10 h-10 flex items-center justify-center rounded-sm transition-colors ${
                  isActive
                    ? "bg-secondary text-mint"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-primary rounded-r" />
                )}
                <item.icon className="w-[18px] h-[18px]" strokeWidth={1.5} />
              </button>
              {/* Tooltip */}
              <div className="absolute left-14 top-1/2 -translate-y-1/2 px-2 py-1 bg-card border border-border rounded-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                <span className="font-mono text-xs text-foreground">{item.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default Sidebar;
