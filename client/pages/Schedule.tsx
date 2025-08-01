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
  Users,
  Edit,
  Trash2,
  Copy,
  Filter,
  Search,
  MoreHorizontal,
  AlertTriangle,
  CheckCircle,
  User,
} from "lucide-react";

const employees = [
  {
    id: "1",
    name: "Sarah Wilson",
    role: "Developer",
    avatar: "/placeholder.svg",
    department: "Engineering",
  },
  {
    id: "2",
    name: "Mike Chen",
    role: "Designer",
    avatar: "/placeholder.svg",
    department: "Design",
  },
  {
    id: "3",
    name: "Emily Davis",
    role: "Manager",
    avatar: "/placeholder.svg",
    department: "Management",
  },
  {
    id: "4",
    name: "Tom Johnson",
    role: "Developer",
    avatar: "/placeholder.svg",
    department: "Engineering",
  },
  {
    id: "5",
    name: "Lisa Brown",
    role: "HR Specialist",
    avatar: "/placeholder.svg",
    department: "HR",
  },
  {
    id: "6",
    name: "David Lee",
    role: "Analyst",
    avatar: "/placeholder.svg",
    department: "Analytics",
  },
];

const shifts = [
  {
    id: "1",
    name: "Morning Shift",
    startTime: "09:00",
    endTime: "17:00",
    color: "bg-blue-500",
  },
  {
    id: "2",
    name: "Evening Shift",
    startTime: "14:00",
    endTime: "22:00",
    color: "bg-green-500",
  },
  {
    id: "3",
    name: "Night Shift",
    startTime: "22:00",
    endTime: "06:00",
    color: "bg-purple-500",
  },
  {
    id: "4",
    name: "Part-time AM",
    startTime: "09:00",
    endTime: "13:00",
    color: "bg-orange-500",
  },
  {
    id: "5",
    name: "Part-time PM",
    startTime: "13:00",
    endTime: "17:00",
    color: "bg-pink-500",
  },
];

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const scheduleData = {
  "1": {
    // Sarah Wilson
    Monday: { shiftId: "1", status: "scheduled" },
    Tuesday: { shiftId: "1", status: "scheduled" },
    Wednesday: { shiftId: "1", status: "scheduled" },
    Thursday: { shiftId: "1", status: "scheduled" },
    Friday: { shiftId: "1", status: "scheduled" },
  },
  "2": {
    // Mike Chen
    Monday: { shiftId: "2", status: "scheduled" },
    Tuesday: { shiftId: "2", status: "scheduled" },
    Wednesday: { shiftId: "2", status: "scheduled" },
    Thursday: { shiftId: "2", status: "scheduled" },
    Friday: { shiftId: "2", status: "scheduled" },
  },
  "3": {
    // Emily Davis
    Monday: { shiftId: "1", status: "scheduled" },
    Tuesday: { shiftId: "1", status: "scheduled" },
    Wednesday: { shiftId: "1", status: "scheduled" },
    Thursday: { shiftId: "1", status: "scheduled" },
    Friday: { shiftId: "1", status: "scheduled" },
  },
  "4": {
    // Tom Johnson
    Tuesday: { shiftId: "3", status: "scheduled" },
    Wednesday: { shiftId: "3", status: "scheduled" },
    Thursday: { shiftId: "3", status: "scheduled" },
    Friday: { shiftId: "3", status: "scheduled" },
    Saturday: { shiftId: "3", status: "scheduled" },
  },
};

const conflicts = [
  { type: "understaffed", day: "Monday", shift: "Night Shift", count: 1 },
  { type: "overstaffed", day: "Friday", shift: "Morning Shift", count: 3 },
];

export default function Schedule() {
  const [selectedWeek, setSelectedWeek] = useState("2024-12-16");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateShiftOpen, setIsCreateShiftOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("calendar");

  const filteredEmployees = employees.filter(
    (emp) =>
      (selectedDepartment === "all" || emp.department === selectedDepartment) &&
      (searchTerm === "" ||
        emp.name.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  const getShiftById = (shiftId: string) =>
    shifts.find((s) => s.id === shiftId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Schedule Management
          </h1>
          <p className="text-muted-foreground">
            Manage employee schedules and shifts
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Copy className="h-4 w-4 mr-2" />
            Copy Previous Week
          </Button>
          <Dialog open={isCreateShiftOpen} onOpenChange={setIsCreateShiftOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Shift
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Shift</DialogTitle>
                <DialogDescription>
                  Define a new shift template for scheduling
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="shift-name">Shift Name</Label>
                  <Input id="shift-name" placeholder="e.g., Morning Shift" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-time">Start Time</Label>
                    <Input id="start-time" type="time" defaultValue="09:00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-time">End Time</Label>
                    <Input id="end-time" type="time" defaultValue="17:00" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color">Color</Label>
                  <Select defaultValue="blue">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="green">Green</SelectItem>
                      <SelectItem value="purple">Purple</SelectItem>
                      <SelectItem value="orange">Orange</SelectItem>
                      <SelectItem value="pink">Pink</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsCreateShiftOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={() => setIsCreateShiftOpen(false)}>
                    Create Shift
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters and Controls */}
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
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Management">Management</SelectItem>
                  <SelectItem value="HR">HR</SelectItem>
                  <SelectItem value="Analytics">Analytics</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-48"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Schedule Conflicts Alert */}
      {conflicts.length > 0 && (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Schedule Conflicts Detected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {conflicts.map((conflict, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">
                      {conflict.day} - {conflict.shift}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {conflict.type === "understaffed"
                        ? `Need ${conflict.count} more employee${conflict.count > 1 ? "s" : ""}`
                        : `${conflict.count} employee${conflict.count > 1 ? "s" : ""} over capacity`}
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    Resolve
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="templates">Shift Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-4">
          {/* Calendar Grid */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Schedule</CardTitle>
              <CardDescription>Week of December 16, 2024</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <div className="grid grid-cols-8 gap-2 min-w-[800px]">
                  {/* Header Row */}
                  <div className="p-2 font-medium text-sm text-muted-foreground">
                    Employee
                  </div>
                  {weekDays.map((day) => (
                    <div
                      key={day}
                      className="p-2 font-medium text-sm text-center"
                    >
                      {day}
                    </div>
                  ))}

                  {/* Employee Rows */}
                  {filteredEmployees.map((employee) => (
                    <div key={employee.id} className="contents">
                      <div className="p-2 border-r border-border">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={employee.avatar} />
                            <AvatarFallback className="text-xs">
                              {employee.name.slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">
                              {employee.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {employee.role}
                            </p>
                          </div>
                        </div>
                      </div>

                      {weekDays.map((day) => {
                        const schedule = scheduleData[employee.id]?.[day];
                        const shift = schedule
                          ? getShiftById(schedule.shiftId)
                          : null;

                        return (
                          <div
                            key={day}
                            className="p-1 border border-border min-h-[60px]"
                          >
                            {shift ? (
                              <div
                                className={`${shift.color} text-white rounded p-2 text-xs cursor-pointer hover:opacity-80 transition-opacity`}
                                onClick={() => {
                                  /* Handle shift click */
                                }}
                              >
                                <p className="font-medium">{shift.name}</p>
                                <p className="opacity-90">
                                  {shift.startTime} - {shift.endTime}
                                </p>
                              </div>
                            ) : (
                              <div
                                className="border-2 border-dashed border-muted-foreground/30 rounded p-2 h-full flex items-center justify-center cursor-pointer hover:border-muted-foreground/50 transition-colors"
                                onClick={() => {
                                  /* Handle empty slot click */
                                }}
                              >
                                <Plus className="h-4 w-4 text-muted-foreground" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Schedule List</CardTitle>
              <CardDescription>
                All scheduled shifts for the selected week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredEmployees.map((employee) => (
                  <div key={employee.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={employee.avatar} />
                          <AvatarFallback>
                            {employee.name.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{employee.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {employee.role} • {employee.department}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {weekDays.map((day) => {
                        const schedule = scheduleData[employee.id]?.[day];
                        const shift = schedule
                          ? getShiftById(schedule.shiftId)
                          : null;

                        return (
                          <div
                            key={day}
                            className="flex items-center justify-between p-2 rounded border"
                          >
                            <span className="text-sm font-medium">{day}</span>
                            {shift ? (
                              <Badge variant="outline" className="text-xs">
                                {shift.startTime} - {shift.endTime}
                              </Badge>
                            ) : (
                              <span className="text-xs text-muted-foreground">
                                Not scheduled
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Shift Templates</CardTitle>
              <CardDescription>
                Manage available shift templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {shifts.map((shift) => (
                  <Card key={shift.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-4 h-4 rounded ${shift.color}`} />
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <h3 className="font-medium mb-2">{shift.name}</h3>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          {shift.startTime} - {shift.endTime}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-3 w-3" />8 hour shift
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Summary Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Scheduled
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">shifts this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Coverage</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">
              of required shifts filled
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conflicts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">requiring attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Overtime Hours
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5</div>
            <p className="text-xs text-muted-foreground">hours scheduled</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
