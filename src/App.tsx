
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SwarmProvider } from "@/context/SwarmContext";
import MainLayout from "@/components/layout/MainLayout";

// Pages
import Dashboard from "./pages/Dashboard";
import Agents from "./pages/Agents";
import AgentDetail from "./pages/AgentDetail";
import Workflows from "./pages/Workflows";
import Tasks from "./pages/Tasks";
import Data from "./pages/Data";
import Documentation from "./pages/Documentation";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SwarmProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout><Dashboard /></MainLayout>} />
            <Route path="/agents" element={<MainLayout><Agents /></MainLayout>} />
            <Route path="/agents/:agentId" element={<MainLayout><AgentDetail /></MainLayout>} />
            <Route path="/workflows" element={<MainLayout><Workflows /></MainLayout>} />
            <Route path="/tasks" element={<MainLayout><Tasks /></MainLayout>} />
            <Route path="/data" element={<MainLayout><Data /></MainLayout>} />
            <Route path="/documentation" element={<MainLayout><Documentation /></MainLayout>} />
            <Route path="/settings" element={<MainLayout><Settings /></MainLayout>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </SwarmProvider>
  </QueryClientProvider>
);

export default App;
