import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  FileText,
  AlertTriangle,
  Clock,
  CheckCircle,
  Receipt,
} from "lucide-react";

interface PayrollEvent {
  id: string;
  date: string;
  title: string;
  type: "payroll" | "tax" | "benefits" | "deadline" | "holiday";
  status: "completed" | "pending" | "upcoming" | "overdue";
  description?: string;
  priority: "high" | "medium" | "low";
}

const payrollEvents: PayrollEvent[] = [
  {
    id: "1",
    date: "2024-12-15",
    title: "Payroll Processing",
    type: "payroll",
    status: "completed",
    description: "December 1-15 pay period processed",
    priority: "high",
  },
  {
    id: "2",
    date: "2024-12-16",
    title: "Federal Tax Deposit",
    type: "tax",
    status: "completed",
    description: "Monthly federal tax deposit due",
    priority: "high",
  },
  {
    id: "3",
    date: "2024-12-25",
    title: "Christmas Day",
    type: "holiday",
    status: "upcoming",
    description: "Federal holiday - office closed",
    priority: "medium",
  },
  {
    id: "4",
    date: "2024-12-31",
    title: "Year-End Payroll",
    type: "payroll",
    status: "pending",
    description: "Final payroll of 2024",
    priority: "high",
  },
  {
    id: "5",
    date: "2025-01-01",
    title: "New Year's Day",
    type: "holiday",
    status: "upcoming",
    description: "Federal holiday - office closed",
    priority: "medium",
  },
  {
    id: "6",
    date: "2025-01-15",
    title: "Q4 Tax Reports Due",
    type: "tax",
    status: "upcoming",
    description: "Quarterly tax reports submission deadline",
    priority: "high",
  },
  {
    id: "7",
    date: "2025-01-31",
    title: "W-2 Forms Due",
    type: "tax",
    status: "upcoming",
    description: "W-2 forms must be provided to employees",
    priority: "high",
  },
  {
    id: "8",
    date: "2025-02-28",
    title: "W-2 Filing Deadline",
    type: "tax",
    status: "upcoming",
    description: "Final deadline for W-2 submission to SSA",
    priority: "high",
  },
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function PayrollCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 11)); // December 2024
  const [selectedView, setSelectedView] = useState("month");

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const getEventsForDate = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return payrollEvents.filter((event) => event.date === dateStr);
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case "payroll":
        return DollarSign;
      case "tax":
        return Receipt;
      case "benefits":
        return CheckCircle;
      case "deadline":
        return Clock;
      case "holiday":
        return Calendar;
      default:
        return FileText;
    }
  };

  const getEventColor = (type: string, status: string) => {
    if (status === "overdue") return "bg-destructive text-white";
    if (status === "completed") return "bg-success text-white";

    switch (type) {
      case "payroll":
        return "bg-primary text-white";
      case "tax":
        return "bg-warning text-white";
      case "benefits":
        return "bg-blue-500 text-white";
      case "deadline":
        return "bg-orange-500 text-white";
      case "holiday":
        return "bg-purple-500 text-white";
      default:
        return "bg-muted";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-destructive";
      case "medium":
        return "border-l-warning";
      case "low":
        return "border-l-muted";
      default:
        return "border-l-muted";
    }
  };

  const days = getDaysInMonth(currentDate);
  const upcomingEvents = payrollEvents
    .filter((event) => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Payroll Calendar
              </CardTitle>
              <CardDescription>
                Track payroll deadlines, tax dates, and important events
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select value={selectedView} onValueChange={setSelectedView}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Month</SelectItem>
                  <SelectItem value="week">Week</SelectItem>
                  <SelectItem value="agenda">Agenda</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {selectedView === "month" && (
            <div className="space-y-4">
              {/* Calendar Header */}
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateMonth("prev")}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h3 className="text-lg font-semibold">
                  {months[currentMonth]} {currentYear}
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateMonth("next")}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {/* Day headers */}
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div
                      key={day}
                      className="p-2 text-center text-sm font-medium text-muted-foreground border-b"
                    >
                      {day}
                    </div>
                  ),
                )}

                {/* Calendar days */}
                {days.map((day, index) => {
                  if (day === null) {
                    return <div key={index} className="p-2 h-24" />;
                  }

                  const events = getEventsForDate(day);
                  const isToday =
                    new Date().getDate() === day &&
                    new Date().getMonth() === currentMonth &&
                    new Date().getFullYear() === currentYear;

                  return (
                    <div
                      key={day}
                      className={`p-1 h-24 border border-border ${isToday ? "bg-primary/5 border-primary" : ""}`}
                    >
                      <div className="h-full flex flex-col">
                        <div
                          className={`text-sm font-medium ${isToday ? "text-primary" : ""}`}
                        >
                          {day}
                        </div>
                        <div className="flex-1 space-y-1 overflow-hidden">
                          {events.slice(0, 2).map((event) => {
                            const IconComponent = getEventIcon(event.type);
                            return (
                              <div
                                key={event.id}
                                className={`text-xs px-1 py-0.5 rounded truncate ${getEventColor(event.type, event.status)}`}
                                title={event.title}
                              >
                                <div className="flex items-center gap-1">
                                  <IconComponent className="h-2.5 w-2.5" />
                                  <span className="truncate">
                                    {event.title}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                          {events.length > 2 && (
                            <div className="text-xs text-muted-foreground">
                              +{events.length - 2} more
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {selectedView === "agenda" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Upcoming Events</h3>
              <div className="space-y-3">
                {upcomingEvents.map((event) => {
                  const IconComponent = getEventIcon(event.type);
                  return (
                    <div
                      key={event.id}
                      className={`p-4 border-l-4 border rounded-lg bg-muted/30 ${getPriorityColor(event.priority)}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div
                            className={`p-2 rounded ${getEventColor(event.type, event.status)}`}
                          >
                            <IconComponent className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="font-medium">{event.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {new Date(event.date).toLocaleDateString(
                                "en-US",
                                {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                },
                              )}
                            </p>
                            {event.description && (
                              <p className="text-sm text-muted-foreground mt-1">
                                {event.description}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              event.priority === "high"
                                ? "destructive"
                                : "secondary"
                            }
                          >
                            {event.priority} priority
                          </Badge>
                          <Badge
                            className={getEventColor(event.type, event.status)}
                          >
                            {event.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Next Payroll</p>
                <p className="font-medium">Dec 31, 2024</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Receipt className="h-4 w-4 text-warning" />
              <div>
                <p className="text-sm text-muted-foreground">Tax Deadline</p>
                <p className="font-medium">Jan 15, 2025</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">W-2 Due</p>
                <p className="font-medium">Jan 31, 2025</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <div>
                <p className="text-sm text-muted-foreground">Overdue Tasks</p>
                <p className="font-medium">0</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
