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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Download,
  Filter,
  Calendar,
  Users,
  Clock,
  AlertTriangle,
  CheckCircle,
  Target,
  BarChart3,
  PieChart as PieChartIcon,
  FileSpreadsheet,
} from "lucide-react";

// Sample data for charts
const attendanceData = [
  { month: "Jan", present: 92, absent: 8, late: 12 },
  { month: "Feb", present: 94, absent: 6, late: 10 },
  { month: "Mar", present: 89, absent: 11, late: 15 },
  { month: "Apr", present: 96, absent: 4, late: 8 },
  { month: "May", present: 93, absent: 7, late: 11 },
  { month: "Jun", present: 91, absent: 9, late: 13 },
];

const departmentData = [
  { department: "Engineering", hours: 1840, efficiency: 94 },
  { department: "Design", hours: 920, efficiency: 96 },
  { department: "Management", hours: 640, efficiency: 89 },
  { department: "HR", hours: 480, efficiency: 92 },
  { department: "Analytics", hours: 560, efficiency: 98 },
];

const overtimeData = [
  { week: "Week 1", hours: 45, employees: 8 },
  { week: "Week 2", hours: 62, employees: 12 },
  { week: "Week 3", hours: 38, employees: 6 },
  { week: "Week 4", hours: 71, employees: 15 },
];

const leaveDistribution = [
  { name: "Vacation", value: 45, color: "#3B82F6" },
  { name: "Sick Leave", value: 25, color: "#EF4444" },
  { name: "Personal", value: 15, color: "#10B981" },
  { name: "Maternity", value: 10, color: "#8B5CF6" },
  { name: "Other", value: 5, color: "#F59E0B" },
];

const productivityTrends = [
  { date: "2024-12-01", productivity: 85, projects: 12 },
  { date: "2024-12-02", productivity: 87, projects: 14 },
  { date: "2024-12-03", productivity: 82, projects: 11 },
  { date: "2024-12-04", productivity: 89, projects: 15 },
  { date: "2024-12-05", productivity: 91, projects: 16 },
  { date: "2024-12-06", productivity: 88, projects: 13 },
  { date: "2024-12-07", productivity: 93, projects: 17 },
];

const topPerformers = [
  {
    name: "Sarah Wilson",
    hours: 168,
    efficiency: 98,
    department: "Engineering",
  },
  { name: "Mike Chen", hours: 164, efficiency: 96, department: "Design" },
  { name: "Emily Davis", hours: 172, efficiency: 94, department: "Management" },
  {
    name: "Tom Johnson",
    hours: 166,
    efficiency: 97,
    department: "Engineering",
  },
  { name: "Lisa Brown", hours: 160, efficiency: 95, department: "HR" },
];

const complianceMetrics = [
  {
    metric: "Overtime Compliance",
    value: 96,
    threshold: 95,
    status: "compliant",
  },
  { metric: "Break Compliance", value: 89, threshold: 90, status: "warning" },
  { metric: "Maximum Hours", value: 100, threshold: 100, status: "compliant" },
  { metric: "Rest Period", value: 94, threshold: 95, status: "warning" },
];

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedTab, setSelectedTab] = useState("overview");

  const generateReport = (type: string) => {
    // In a real app, this would generate and download a report
    console.log("Generating report:", type);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Reports & Analytics
          </h1>
          <p className="text-muted-foreground">
            Comprehensive insights into attendance, productivity, and compliance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => generateReport("attendance")}
          >
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button onClick={() => generateReport("custom")}>
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Custom Report
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <Label htmlFor="period-select">Period:</Label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Label htmlFor="department-filter">Department:</Label>
              <Select
                value={selectedDepartment}
                onValueChange={setSelectedDepartment}
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="management">Management</SelectItem>
                  <SelectItem value="hr">HR</SelectItem>
                  <SelectItem value="analytics">Analytics</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Label htmlFor="date-range">Date Range:</Label>
              <Input
                id="date-range"
                type="date"
                className="w-40"
                defaultValue="2024-12-01"
              />
              <span className="text-muted-foreground">to</span>
              <Input type="date" className="w-40" defaultValue="2024-12-31" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="productivity">Productivity</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Attendance Rate
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94.2%</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1 text-success" />
                  +2.1% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Hours
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">41.3h</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  <TrendingDown className="h-3 w-3 mr-1 text-destructive" />
                  -0.5h from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Overtime Hours
                </CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">216h</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1 text-warning" />
                  +15% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Team Efficiency
                </CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">91.8%</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1 text-success" />
                  +3.2% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row 1 */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Attendance Trends</CardTitle>
                <CardDescription>
                  Attendance, absence, and lateness patterns over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="present"
                      stroke="#10B981"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="absent"
                      stroke="#EF4444"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="late"
                      stroke="#F59E0B"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Department Performance</CardTitle>
                <CardDescription>
                  Hours worked and efficiency by department
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={departmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="department"
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="hours" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row 2 */}
          <div className="grid gap-6 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Leave Distribution</CardTitle>
                <CardDescription>
                  Breakdown of leave types used this year
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={leaveDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                    >
                      {leaveDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {leaveDistribution.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded"
                          style={{ backgroundColor: item.color }}
                        />
                        <span>{item.name}</span>
                      </div>
                      <span>{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Weekly Overtime</CardTitle>
                <CardDescription>
                  Overtime hours and affected employees by week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={overtimeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="hours"
                      stroke="#8B5CF6"
                      fill="#8B5CF6"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Analysis</CardTitle>
              <CardDescription>
                Detailed attendance metrics and patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 lg:grid-cols-2">
                <div>
                  <h3 className="font-medium mb-4">Top Performers</h3>
                  <div className="space-y-3">
                    {topPerformers.map((performer, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border rounded"
                      >
                        <div>
                          <p className="font-medium">{performer.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {performer.department}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{performer.hours}h</p>
                          <p className="text-sm text-muted-foreground">
                            {performer.efficiency}% efficiency
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Attendance Patterns</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Monday Attendance</span>
                        <span>89%</span>
                      </div>
                      <Progress value={89} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Tuesday Attendance</span>
                        <span>94%</span>
                      </div>
                      <Progress value={94} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Wednesday Attendance</span>
                        <span>96%</span>
                      </div>
                      <Progress value={96} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Thursday Attendance</span>
                        <span>95%</span>
                      </div>
                      <Progress value={95} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Friday Attendance</span>
                        <span>87%</span>
                      </div>
                      <Progress value={87} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="productivity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Productivity Trends</CardTitle>
              <CardDescription>
                Team productivity metrics and project completion rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={productivityTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="productivity"
                    stroke="#10B981"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="projects"
                    stroke="#3B82F6"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Project Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Active Projects</span>
                    <Badge>24</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Completed This Month</span>
                    <Badge variant="outline">18</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Average Completion Time</span>
                    <span className="text-sm">12.3 days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Team Utilization</span>
                    <span className="text-sm">84%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quality Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Bug Rate</span>
                    <Badge variant="destructive">2.3%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Code Review Coverage</span>
                    <Badge>98%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Customer Satisfaction</span>
                    <span className="text-sm">4.8/5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Delivery On Time</span>
                    <span className="text-sm">91%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Labor Law Compliance</CardTitle>
              <CardDescription>
                Compliance status with labor regulations and company policies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {complianceMetrics.map((metric, index) => (
                  <div key={index} className="p-4 border rounded">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{metric.metric}</h3>
                      <Badge
                        variant={
                          metric.status === "compliant"
                            ? "default"
                            : "destructive"
                        }
                        className={
                          metric.status === "compliant"
                            ? "bg-success"
                            : metric.status === "warning"
                              ? "bg-warning"
                              : "bg-destructive"
                        }
                      >
                        {metric.status === "compliant"
                          ? "Compliant"
                          : metric.status === "warning"
                            ? "Warning"
                            : "Non-Compliant"}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Current</span>
                        <span>{metric.value}%</span>
                      </div>
                      <Progress
                        value={metric.value}
                        className={`h-2 ${
                          metric.value >= metric.threshold
                            ? "bg-success/20"
                            : "bg-destructive/20"
                        }`}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Threshold: {metric.threshold}%</span>
                        <span>
                          {metric.value >= metric.threshold
                            ? `+${metric.value - metric.threshold}%`
                            : `${metric.value - metric.threshold}%`}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Compliance Alerts</CardTitle>
              <CardDescription>
                Recent compliance issues and recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 border rounded border-warning/50 bg-warning/5">
                  <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                  <div>
                    <p className="font-medium">
                      Break Compliance Below Threshold
                    </p>
                    <p className="text-sm text-muted-foreground">
                      3 employees have not taken required breaks in the past
                      week
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 border rounded border-success/50 bg-success/5">
                  <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                  <div>
                    <p className="font-medium">
                      Overtime Compliance Maintained
                    </p>
                    <p className="text-sm text-muted-foreground">
                      All overtime hours are within legal limits for this month
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 border rounded border-warning/50 bg-warning/5">
                  <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                  <div>
                    <p className="font-medium">Rest Period Monitoring</p>
                    <p className="text-sm text-muted-foreground">
                      2 employees approaching minimum rest period requirements
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
