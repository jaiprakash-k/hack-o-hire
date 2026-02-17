import { ReactNode } from "react";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-background bg-grid">
      <div className="bg-noise absolute inset-0 pointer-events-none" />
      <Sidebar />
      <main className="flex-1 ml-16 relative z-10 bg-radial-glow">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
