import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

interface GraphNode {
  id: string;
  type: "user" | "device" | "account";
  label: string;
  x: number;
  y: number;
  risk: number;
  cluster: "suspicious" | "safe";
}

interface GraphEdge {
  from: string;
  to: string;
  type: string;
}

const nodes: GraphNode[] = [
  { id: "u1", type: "user", label: "USR-4821", x: 200, y: 150, risk: 94, cluster: "suspicious" },
  { id: "u2", type: "user", label: "USR-9012", x: 350, y: 100, risk: 88, cluster: "suspicious" },
  { id: "u3", type: "user", label: "USR-6643", x: 300, y: 280, risk: 71, cluster: "suspicious" },
  { id: "d1", type: "device", label: "DEV-X91", x: 270, y: 190, risk: 85, cluster: "suspicious" },
  { id: "a1", type: "account", label: "ACC-7712", x: 420, y: 220, risk: 79, cluster: "suspicious" },
  { id: "u4", type: "user", label: "USR-1156", x: 650, y: 150, risk: 12, cluster: "safe" },
  { id: "u5", type: "user", label: "USR-2217", x: 700, y: 280, risk: 8, cluster: "safe" },
  { id: "d2", type: "device", label: "DEV-M44", x: 680, y: 210, risk: 10, cluster: "safe" },
  { id: "a2", type: "account", label: "ACC-3301", x: 580, y: 250, risk: 15, cluster: "safe" },
];

const edges: GraphEdge[] = [
  { from: "u1", to: "d1", type: "Shared Device" },
  { from: "u2", to: "d1", type: "Shared Device" },
  { from: "u3", to: "d1", type: "Shared Device" },
  { from: "u2", to: "a1", type: "Shared Recipient" },
  { from: "u3", to: "a1", type: "Transaction Link" },
  { from: "u1", to: "u2", type: "Transaction Link" },
  { from: "u4", to: "d2", type: "Shared Device" },
  { from: "u5", to: "d2", type: "Shared Device" },
  { from: "u4", to: "a2", type: "Transaction Link" },
  { from: "u5", to: "a2", type: "Transaction Link" },
];

const nodeColors = {
  user: { suspicious: "#FF2E2E", safe: "#6F7782" },
  device: { suspicious: "#F5B942", safe: "#6F7782" },
  account: { suspicious: "#FF2E2E", safe: "#6F7782" },
};

const nodeShapes = {
  user: 20,
  device: 16,
  account: 18,
};

const FraudNetwork = () => {
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);

  const getNode = (id: string) => nodes.find((n) => n.id === id)!;

  return (
    <DashboardLayout>
      <div className="p-8 h-[calc(100vh-0px)] flex flex-col">
        <h1 className="font-display text-2xl font-bold uppercase tracking-widest text-foreground mb-6">
          Fraud Network Graph
        </h1>

        <div className="flex-1 relative bg-surface border border-border rounded-sm overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 900 400">
            {/* Edges */}
            {edges.map((edge, i) => {
              const from = getNode(edge.from);
              const to = getNode(edge.to);
              const isSuspicious = from.cluster === "suspicious";
              return (
                <line
                  key={i}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={isSuspicious ? "#FF2E2E" : "#333"}
                  strokeWidth={isSuspicious ? 1.5 : 0.8}
                  strokeOpacity={isSuspicious ? 0.5 : 0.2}
                />
              );
            })}

            {/* Nodes */}
            {nodes.map((node) => {
              const color = nodeColors[node.type][node.cluster];
              const r = nodeShapes[node.type];
              return (
                <g
                  key={node.id}
                  onMouseEnter={() => setHoveredNode(node)}
                  onMouseLeave={() => setHoveredNode(null)}
                  className="cursor-pointer"
                >
                  {/* Glow for suspicious */}
                  {node.cluster === "suspicious" && (
                    <circle cx={node.x} cy={node.y} r={r + 8} fill={color} fillOpacity={0.1} />
                  )}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={r / 2}
                    fill={color}
                    fillOpacity={node.cluster === "safe" ? 0.3 : 0.8}
                    stroke={color}
                    strokeWidth={1.5}
                    strokeOpacity={node.cluster === "safe" ? 0.2 : 0.6}
                  />
                  <text
                    x={node.x}
                    y={node.y + r / 2 + 14}
                    textAnchor="middle"
                    className="font-mono"
                    fill="#6F7782"
                    fontSize={9}
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Hover tooltip */}
          {hoveredNode && (
            <div
              className="absolute bg-card border border-border rounded-sm p-4 pointer-events-none z-10 min-w-[200px]"
              style={{ left: hoveredNode.x + 80, top: hoveredNode.y - 20 }}
            >
              <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-2">
                {hoveredNode.type}
              </p>
              <p className="font-display text-sm font-bold text-foreground">{hoveredNode.label}</p>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between">
                  <span className="font-mono text-[10px] text-muted-foreground">Risk Score</span>
                  <span className={`font-mono text-xs font-semibold ${hoveredNode.risk > 60 ? "text-danger" : "text-mint"}`}>
                    {hoveredNode.risk}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono text-[10px] text-muted-foreground">Linked Entities</span>
                  <span className="font-mono text-xs text-foreground">
                    {edges.filter((e) => e.from === hoveredNode.id || e.to === hoveredNode.id).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono text-[10px] text-muted-foreground">Cluster</span>
                  <span className={`font-mono text-[10px] uppercase ${hoveredNode.cluster === "suspicious" ? "text-danger" : "text-muted-foreground"}`}>
                    {hoveredNode.cluster}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-card/80 border border-border rounded-sm p-3 flex gap-6">
            <span className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
              <span className="w-3 h-3 rounded-full bg-destructive" /> Suspicious
            </span>
            <span className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
              <span className="w-3 h-3 rounded-full bg-muted-foreground/30" /> Safe
            </span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FraudNetwork;
