import "./global.css";
import React from "react";

// Suppress Recharts defaultProps warnings
const originalWarn = console.warn;
console.warn = (...args) => {
  const message = args[0];
  if (
    typeof message === "string" &&
    (message.includes(
      "defaultProps will be removed from function components",
    ) ||
      message.includes("Support for defaultProps will be removed"))
  ) {
    return;
  }
  originalWarn.apply(console, args);
};

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import TimeClock from "./pages/TimeClock";
import Schedule from "./pages/Schedule";
import LeaveManagement from "./pages/LeaveManagement";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Attendance from "./pages/Attendance";
import Timesheets from "./pages/Timesheets";
import TeamManagement from "./pages/TeamManagement";
import Payroll from "./pages/Payroll";
import EmployeePortal from "./pages/EmployeePortal";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clock" element={<TimeClock />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/leave" element={<LeaveManagement />} />
            <Route path="/payroll" element={<Payroll />} />
            <Route path="/employee-portal" element={<EmployeePortal />} />
            <Route path="/team" element={<TeamManagement />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/timesheets" element={<Timesheets />} />
            <Route path="/settings" element={<Settings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
