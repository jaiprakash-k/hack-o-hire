import DashboardLayout from "../components/DashboardLayout";
import StatCard from "../components/StatCard";
import FraudStream from "../components/FraudStream";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-2xl font-bold uppercase tracking-widest text-foreground">
            Fraud Intelligence Overview
          </h1>
          <p className="font-mono text-xs text-muted-foreground mt-1">
            Last updated: 14:32:08 UTC · All systems nominal
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          <StatCard label="Active Threats" value={23} change="↑ 4 from last hour" severity="danger" delay={50} />
          <StatCard label="High Risk Txns" value={147} change="Past 24 hours" severity="warning" delay={100} />
          <StatCard label="Fraud Rings" value={3} change="2 new this week" severity="danger" delay={150} />
          <StatCard label="Confidence Score" value="87/100" change="Model v3.2.1" severity="safe" delay={200} />
        </div>

        {/* Fraud Stream */}
        <FraudStream />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
