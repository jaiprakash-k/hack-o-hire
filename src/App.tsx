import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EmailScanner from "./pages/EmailScanner";
import TransactionAnalysis from "./pages/TransactionAnalysis";
import FraudNetwork from "./pages/FraudNetwork";
import ModelMonitoring from "./pages/ModelMonitoring";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/email-scanner" element={<EmailScanner />} />
          <Route path="/transactions" element={<TransactionAnalysis />} />
          <Route path="/fraud-network" element={<FraudNetwork />} />
          <Route path="/model-monitoring" element={<ModelMonitoring />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
