import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import TimeClock from "./pages/TimeClock";
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
            <Route path="/schedule" element={
              <PlaceholderPage
                title="Schedule Management"
                description="Manage employee schedules and shifts"
                features={[
                  "Create and edit employee schedules",
                  "Shift planning and rotation",
                  "Schedule templates",
                  "Availability management",
                  "Schedule conflicts detection"
                ]}
              />
            } />
            <Route path="/leave" element={
              <PlaceholderPage
                title="Leave Management"
                description="Handle leave requests and approvals"
                features={[
                  "Submit leave requests",
                  "Manager approval workflow",
                  "Leave balance tracking",
                  "Holiday calendar",
                  "Leave policy management"
                ]}
              />
            } />
            <Route path="/team" element={
              <PlaceholderPage
                title="Team Management"
                description="Manage team members and roles"
                features={[
                  "Employee directory",
                  "Role and permission management",
                  "Team hierarchy",
                  "Employee profiles",
                  "Department organization"
                ]}
              />
            } />
            <Route path="/reports" element={
              <PlaceholderPage
                title="Reports & Analytics"
                description="Generate detailed reports and analytics"
                features={[
                  "Attendance reports",
                  "Time tracking analytics",
                  "Productivity insights",
                  "Export capabilities",
                  "Custom report builder"
                ]}
              />
            } />
            <Route path="/attendance" element={
              <PlaceholderPage
                title="Attendance Tracking"
                description="Monitor and track employee attendance"
                features={[
                  "Daily attendance overview",
                  "Absence tracking",
                  "Late arrival notifications",
                  "Attendance patterns",
                  "Compliance monitoring"
                ]}
              />
            } />
            <Route path="/timesheets" element={
              <PlaceholderPage
                title="Timesheet Management"
                description="Review and approve employee timesheets"
                features={[
                  "Timesheet submission",
                  "Manager review and approval",
                  "Project time allocation",
                  "Billing integration",
                  "Timesheet corrections"
                ]}
              />
            } />
            <Route path="/settings" element={
              <PlaceholderPage
                title="Settings"
                description="Configure system settings and preferences"
                features={[
                  "Company settings",
                  "User preferences",
                  "Notification settings",
                  "Integration management",
                  "Security settings"
                ]}
              />
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
