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
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  Clock,
  Plus,
  Edit,
  Check,
  X,
  DollarSign,
  FileText,
  Filter,
  Search,
  Download,
  AlertTriangle,
  CheckCircle,
  User,
  Building,
  Briefcase,
} from "lucide-react";

const projects = [
  {
    id: "1",
    name: "Website Redesign",
    client: "Acme Corp",
    rate: 150,
    billable: true,
  },
  {
    id: "2",
    name: "Mobile App Development",
    client: "TechStart",
    rate: 175,
    billable: true,
  },
  {
    id: "3",
    name: "Internal Training",
    client: "Internal",
    rate: 0,
    billable: false,
  },
  {
    id: "4",
    name: "Team Meeting",
    client: "Internal",
    rate: 0,
    billable: false,
  },
];

const timesheets = [
  {
    id: "1",
    employee: {
      name: "Sarah Wilson",
      avatar: "/placeholder.svg",
      id: "EMP001",
    },
    week: "Dec 16-22, 2024",
    status: "submitted",
    totalHours: 40,
    billableHours: 35,
    submittedDate: "2024-12-19",
    approvedBy: null,
    entries: [
      {
        date: "2024-12-16",
        project: "Website Redesign",
        hours: 8,
        description: "Homepage design implementation",
        billable: true,
      },
      {
        date: "2024-12-17",
        project: "Website Redesign",
        hours: 7,
        description: "Responsive layout fixes",
        billable: true,
      },
      {
        date: "2024-12-18",
        project: "Internal Training",
        hours: 1,
        description: "React workshop",
        billable: false,
      },
      {
        date: "2024-12-19",
        project: "Website Redesign",
        hours: 8,
        description: "Component optimization",
        billable: true,
      },
      {
        date: "2024-12-20",
        project: "Team Meeting",
        hours: 2,
        description: "Sprint planning",
        billable: false,
      },
    ],
  },
  {
    id: "2",
    employee: { name: "Mike Chen", avatar: "/placeholder.svg", id: "EMP002" },
    week: "Dec 16-22, 2024",
    status: "approved",
    totalHours: 38,
    billableHours: 32,
    submittedDate: "2024-12-18",
    approvedBy: "Emily Davis",
    approvedDate: "2024-12-19",
    entries: [
      {
        date: "2024-12-16",
        project: "Mobile App Development",
        hours: 8,
        description: "UI mockups creation",
        billable: true,
      },
      {
        date: "2024-12-17",
        project: "Mobile App Development",
        hours: 6,
        description: "Component development",
        billable: true,
      },
      {
        date: "2024-12-18",
        project: "Mobile App Development",
        hours: 8,
        description: "API integration",
        billable: true,
      },
      {
        date: "2024-12-19",
        project: "Team Meeting",
        hours: 2,
        description: "Design review",
        billable: false,
      },
    ],
  },
];

const pendingApprovals = [
  {
    employee: "Sarah Wilson",
    week: "Dec 16-22",
    hours: 40,
    submitted: "2024-12-19",
    urgent: false,
  },
  {
    employee: "Tom Johnson",
    week: "Dec 16-22",
    hours: 45,
    submitted: "2024-12-18",
    urgent: true,
  },
  {
    employee: "Lisa Brown",
    week: "Dec 9-15",
    hours: 38,
    submitted: "2024-12-16",
    urgent: true,
  },
];

const corrections = [
  {
    employee: "Mike Chen",
    week: "Dec 9-15",
    issue: "Incorrect project allocation",
    status: "pending",
    requestDate: "2024-12-17",
  },
  {
    employee: "Sarah Wilson",
    week: "Dec 2-8",
    issue: "Missing overtime hours",
    status: "approved",
    requestDate: "2024-12-10",
  },
];

export default function Timesheets() {
  const [selectedTab, setSelectedTab] = useState("my-timesheets");
  const [isCreateEntryOpen, setIsCreateEntryOpen] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState("2024-12-16");
  const [selectedProject, setSelectedProject] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [newEntry, setNewEntry] = useState({
    date: "",
    project: "",
    hours: "",
    description: "",
  });

  const handleCreateEntry = () => {
    // In a real app, this would create a new timesheet entry
    console.log("Creating entry:", newEntry);
    setIsCreateEntryOpen(false);
    setNewEntry({ date: "", project: "", hours: "", description: "" });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-success";
      case "submitted":
        return "bg-warning";
      case "draft":
        return "bg-muted";
      case "rejected":
        return "bg-destructive";
      default:
        return "bg-muted";
    }
  };

  const calculateBilling = (hours: number, rate: number) => {
    return hours * rate;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Timesheet Management
          </h1>
          <p className="text-muted-foreground">
            Submit, review, and manage employee timesheets
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Timesheets
          </Button>
          <Dialog open={isCreateEntryOpen} onOpenChange={setIsCreateEntryOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Entry
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Time Entry</DialogTitle>
                <DialogDescription>
                  Add a new time entry to your timesheet
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="entry-date">Date</Label>
                  <Input
                    id="entry-date"
                    type="date"
                    value={newEntry.date}
                    onChange={(e) =>
                      setNewEntry((prev) => ({ ...prev, date: e.target.value }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="entry-project">Project</Label>
                  <Select
                    value={newEntry.project}
                    onValueChange={(value) =>
                      setNewEntry((prev) => ({ ...prev, project: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      {projects.map((project) => (
                        <SelectItem key={project.id} value={project.id}>
                          <div>
                            <p className="font-medium">{project.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {project.client}
                            </p>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="entry-hours">Hours</Label>
                  <Input
                    id="entry-hours"
                    type="number"
                    step="0.25"
                    min="0"
                    max="24"
                    value={newEntry.hours}
                    onChange={(e) =>
                      setNewEntry((prev) => ({
                        ...prev,
                        hours: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="entry-description">Description</Label>
                  <Textarea
                    id="entry-description"
                    placeholder="Describe the work performed..."
                    value={newEntry.description}
                    onChange={(e) =>
                      setNewEntry((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    rows={3}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsCreateEntryOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleCreateEntry}>Add Entry</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="my-timesheets">My Timesheets</TabsTrigger>
          <TabsTrigger value="approvals">Pending Approvals</TabsTrigger>
          <TabsTrigger value="billing">Billing & Rates</TabsTrigger>
          <TabsTrigger value="corrections">Corrections</TabsTrigger>
        </TabsList>

        <TabsContent value="my-timesheets" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="week-select">Week of:</Label>
                  <Input
                    id="week-select"
                    type="date"
                    value={selectedWeek}
                    onChange={(e) => setSelectedWeek(e.target.value)}
                    className="w-40"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="status-filter">Status:</Label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="submitted">Submitted</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Week Summary */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Hours
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">40.0h</div>
                <p className="text-xs text-muted-foreground">This week</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Billable Hours
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">35.0h</div>
                <p className="text-xs text-muted-foreground">87.5% billable</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Projects</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">Active projects</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Status</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Draft</div>
                <p className="text-xs text-muted-foreground">Ready to submit</p>
              </CardContent>
            </Card>
          </div>

          {/* Timesheet Entries */}
          <Card>
            <CardHeader>
              <CardTitle>Time Entries</CardTitle>
              <CardDescription>
                Your time entries for the week of December 16-22, 2024
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-6 gap-4 text-sm font-medium text-muted-foreground border-b pb-2">
                  <div>Date</div>
                  <div>Project</div>
                  <div>Hours</div>
                  <div>Billable</div>
                  <div>Description</div>
                  <div>Actions</div>
                </div>

                {timesheets[0].entries.map((entry, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-6 gap-4 text-sm items-center py-2 border-b last:border-b-0"
                  >
                    <div className="font-medium">
                      {new Date(entry.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <div>
                      <p className="font-medium">{entry.project}</p>
                    </div>
                    <div className="font-mono">{entry.hours}h</div>
                    <div>
                      <Badge
                        variant={entry.billable ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {entry.billable ? "Billable" : "Non-billable"}
                      </Badge>
                    </div>
                    <div className="text-muted-foreground">
                      {entry.description}
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}

                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-4">
                      <div>
                        <span className="text-sm text-muted-foreground">
                          Total Hours:{" "}
                        </span>
                        <span className="font-medium">40.0h</span>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">
                          Billable:{" "}
                        </span>
                        <span className="font-medium">35.0h</span>
                      </div>
                    </div>
                    <Button>Submit Timesheet</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approvals" className="space-y-6">
          {/* Approval Overview */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">
                  Timesheets awaiting approval
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Urgent</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">
                  Overdue for approval
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">This Week</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-muted-foreground">
                  Timesheets approved
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Pending Approvals List */}
          <Card>
            <CardHeader>
              <CardTitle>Pending Approvals</CardTitle>
              <CardDescription>
                Timesheets requiring your approval
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingApprovals.map((timesheet, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>
                          {timesheet.employee.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{timesheet.employee}</h3>
                          {timesheet.urgent && (
                            <Badge variant="destructive" className="text-xs">
                              Urgent
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Week: {timesheet.week} • {timesheet.hours} hours
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Submitted:{" "}
                          {new Date(timesheet.submitted).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        Review
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-success border-success"
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-destructive border-destructive"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          {/* Project Rates */}
          <Card>
            <CardHeader>
              <CardTitle>Project Billing Rates</CardTitle>
              <CardDescription>
                Hourly rates and billing information by project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-muted rounded">
                        <Building className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">{project.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {project.client}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <Badge
                        variant={project.billable ? "default" : "secondary"}
                      >
                        {project.billable ? "Billable" : "Non-billable"}
                      </Badge>
                      <div className="text-right">
                        <p className="font-medium">
                          {project.billable
                            ? `$${project.rate}/hr`
                            : "Internal"}
                        </p>
                        <p className="text-xs text-muted-foreground">Rate</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Billing Summary */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>This Week's Billing</CardTitle>
                <CardDescription>
                  Estimated billing for current week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 border rounded">
                    <span>Website Redesign (25h)</span>
                    <span className="font-medium">$3,750</span>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded">
                    <span>Mobile App (10h)</span>
                    <span className="font-medium">$1,750</span>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded bg-muted">
                    <span className="font-medium">Total Billable</span>
                    <span className="font-bold text-lg">$5,500</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Summary</CardTitle>
                <CardDescription>
                  December 2024 billing overview
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Hours</span>
                    <span className="font-medium">156h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Billable Hours</span>
                    <span className="font-medium">132h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Billing Rate</span>
                    <span className="font-medium">84.6%</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t">
                    <span>Total Revenue</span>
                    <span>$21,800</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="corrections" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Timesheet Corrections</CardTitle>
              <CardDescription>
                Requests for timesheet modifications and corrections
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {corrections.map((correction, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{correction.employee}</h3>
                        <Badge
                          variant={
                            correction.status === "approved"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {correction.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Week: {correction.week}
                      </p>
                      <p className="text-sm">{correction.issue}</p>
                      <p className="text-xs text-muted-foreground">
                        Requested:{" "}
                        {new Date(correction.requestDate).toLocaleDateString()}
                      </p>
                    </div>

                    {correction.status === "pending" && (
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Review
                        </Button>
                        <Button size="sm">Approve</Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Request Correction</CardTitle>
              <CardDescription>
                Submit a request to correct a previous timesheet
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="correction-week">Week</Label>
                    <Input id="correction-week" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="correction-type">Issue Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select issue type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hours">Incorrect hours</SelectItem>
                        <SelectItem value="project">Wrong project</SelectItem>
                        <SelectItem value="missing">Missing entries</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="correction-description">Description</Label>
                  <Textarea
                    id="correction-description"
                    placeholder="Describe the correction needed..."
                    rows={3}
                  />
                </div>

                <Button>Submit Correction Request</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
