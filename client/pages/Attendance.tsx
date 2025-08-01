import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Users,
  TrendingUp,
  TrendingDown,
  Filter,
  Search,
  Download,
  Bell,
  MapPin,
  User,
  Shield,
  Calendar as CalendarIcon
} from 'lucide-react';

const attendanceData = [
  {
    id: '1',
    employee: { name: 'Sarah Wilson', avatar: '/placeholder.svg', department: 'Engineering', id: 'EMP001' },
    date: '2024-12-18',
    clockIn: '08:45',
    clockOut: '17:30',
    status: 'present',
    hours: 8.75,
    isLate: false,
    location: 'Office'
  },
  {
    id: '2',
    employee: { name: 'Mike Chen', avatar: '/placeholder.svg', department: 'Design', id: 'EMP002' },
    date: '2024-12-18',
    clockIn: '09:15',
    clockOut: '18:00',
    status: 'present',
    hours: 8.75,
    isLate: true,
    location: 'Remote'
  },
  {
    id: '3',
    employee: { name: 'Emily Davis', avatar: '/placeholder.svg', department: 'Management', id: 'EMP003' },
    date: '2024-12-18',
    clockIn: null,
    clockOut: null,
    status: 'absent',
    hours: 0,
    isLate: false,
    reason: 'Sick Leave',
    location: null
  },
  {
    id: '4',
    employee: { name: 'Tom Johnson', avatar: '/placeholder.svg', department: 'Engineering', id: 'EMP004' },
    date: '2024-12-18',
    clockIn: '09:30',
    clockOut: null,
    status: 'present',
    hours: 0,
    isLate: true,
    location: 'Office'
  }
];

const lateArrivals = [
  { employee: 'Mike Chen', time: '09:15', expected: '09:00', delay: '15 min', date: '2024-12-18' },
  { employee: 'Tom Johnson', time: '09:30', expected: '09:00', delay: '30 min', date: '2024-12-18' },
  { employee: 'Lisa Brown', time: '09:20', expected: '09:00', delay: '20 min', date: '2024-12-17' },
];

const absentees = [
  { employee: 'Emily Davis', reason: 'Sick Leave', type: 'unplanned', approved: true, date: '2024-12-18' },
  { employee: 'David Lee', reason: 'Personal', type: 'planned', approved: true, date: '2024-12-18' },
  { employee: 'Alex Smith', reason: 'No Show', type: 'unplanned', approved: false, date: '2024-12-18' },
];

const attendancePatterns = [
  { day: 'Monday', rate: 94, trend: 'up' },
  { day: 'Tuesday', rate: 96, trend: 'up' },
  { day: 'Wednesday', rate: 98, trend: 'up' },
  { day: 'Thursday', rate: 95, trend: 'down' },
  { day: 'Friday', rate: 89, trend: 'down' },
];

const complianceMetrics = [
  { metric: 'Daily Attendance Rate', value: 94, target: 95, status: 'warning' },
  { metric: 'On-Time Arrival Rate', value: 87, target: 90, status: 'critical' },
  { metric: 'Break Compliance', value: 96, target: 95, status: 'good' },
  { metric: 'Overtime Compliance', value: 98, target: 95, status: 'good' },
];

export default function Attendance() {
  const [selectedDate, setSelectedDate] = useState('2024-12-18');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('overview');

  const filteredAttendance = attendanceData.filter(record => 
    (selectedDepartment === 'all' || record.employee.department === selectedDepartment) &&
    (searchTerm === '' || record.employee.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-success';
      case 'absent': return 'bg-destructive';
      case 'late': return 'bg-warning';
      default: return 'bg-muted';
    }
  };

  const getComplianceColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-success';
      case 'warning': return 'bg-warning';
      case 'critical': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Attendance Tracking</h1>
          <p className="text-muted-foreground">
            Monitor and track employee attendance patterns and compliance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <Bell className="h-4 w-4 mr-2" />
            Send Notifications
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <Label htmlFor="date-select">Date:</Label>
              <Input
                id="date-select"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-40"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Label htmlFor="department-filter">Department:</Label>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Management">Management</SelectItem>
                  <SelectItem value="HR">HR</SelectItem>
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

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="overview">Daily Overview</TabsTrigger>
          <TabsTrigger value="patterns">Attendance Patterns</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="alerts">Alerts & Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Daily Statistics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Present Today</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  out of 16 employees
                </p>
                <Progress value={75} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Late Arrivals</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">
                  Avg delay: 22 minutes
                </p>
                <Badge variant="destructive" className="mt-2 text-xs">
                  Above threshold
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Absences</CardTitle>
                <XCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
                <p className="text-xs text-muted-foreground">
                  2 planned, 2 unplanned
                </p>
                <div className="flex gap-1 mt-2">
                  <Badge variant="outline" className="text-xs">2 approved</Badge>
                  <Badge variant="destructive" className="text-xs">2 pending</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">75%</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  <TrendingDown className="h-3 w-3 mr-1 text-destructive" />
                  -5% from yesterday
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Daily Attendance List */}
          <Card>
            <CardHeader>
              <CardTitle>Today's Attendance</CardTitle>
              <CardDescription>
                Detailed attendance records for {new Date(selectedDate).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredAttendance.map((record) => (
                  <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={record.employee.avatar} />
                        <AvatarFallback>{record.employee.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{record.employee.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            {record.employee.id}
                          </Badge>
                          {record.isLate && (
                            <Badge variant="destructive" className="text-xs">
                              Late
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{record.employee.department}</p>
                        {record.location && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {record.location}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        {record.status === 'present' ? (
                          <>
                            <p className="text-sm font-medium">
                              {record.clockIn} - {record.clockOut || 'In Progress'}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {record.hours > 0 ? `${record.hours}h` : 'Active'}
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="text-sm font-medium text-destructive">Absent</p>
                            <p className="text-xs text-muted-foreground">{record.reason}</p>
                          </>
                        )}
                      </div>
                      
                      <Badge className={`${getStatusColor(record.status)} text-white`}>
                        {record.status === 'present' ? 'Present' : 'Absent'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Late Arrivals & Absences */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Late Arrivals</CardTitle>
                <CardDescription>Employees who arrived late today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {lateArrivals.map((late, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="font-medium">{late.employee}</p>
                        <p className="text-sm text-muted-foreground">
                          Arrived: {late.time} (Expected: {late.expected})
                        </p>
                      </div>
                      <Badge variant="destructive" className="text-xs">
                        +{late.delay}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Today's Absences</CardTitle>
                <CardDescription>Employees absent today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {absentees.map((absent, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="font-medium">{absent.employee}</p>
                        <p className="text-sm text-muted-foreground">{absent.reason}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={absent.type === 'planned' ? 'default' : 'secondary'}>
                          {absent.type}
                        </Badge>
                        <Badge variant={absent.approved ? 'default' : 'destructive'}>
                          {absent.approved ? 'Approved' : 'Pending'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Attendance Patterns</CardTitle>
              <CardDescription>
                Attendance rates and trends by day of the week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {attendancePatterns.map((pattern, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-20 text-sm font-medium">{pattern.day}</div>
                      <div className="flex-1">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Attendance Rate</span>
                          <span>{pattern.rate}%</span>
                        </div>
                        <Progress value={pattern.rate} className="h-2" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {pattern.trend === 'up' ? (
                        <TrendingUp className="h-4 w-4 text-success" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-destructive" />
                      )}
                      <span className="text-sm font-medium">{pattern.rate}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Department Comparison</CardTitle>
                <CardDescription>Attendance rates by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { dept: 'Engineering', rate: 96 },
                    { dept: 'Design', rate: 94 },
                    { dept: 'Management', rate: 98 },
                    { dept: 'HR', rate: 92 }
                  ].map((dept, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{dept.dept}</span>
                        <span>{dept.rate}%</span>
                      </div>
                      <Progress value={dept.rate} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Trends</CardTitle>
                <CardDescription>Attendance trends over the past months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { month: 'October', rate: 94, change: '+2%' },
                    { month: 'November', rate: 96, change: '+2%' },
                    { month: 'December', rate: 93, change: '-3%' }
                  ].map((month, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded">
                      <span className="font-medium">{month.month}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">{month.rate}%</span>
                        <Badge variant={month.change.startsWith('+') ? 'default' : 'destructive'}>
                          {month.change}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Monitoring</CardTitle>
              <CardDescription>
                Track compliance with attendance policies and labor regulations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {complianceMetrics.map((metric, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">{metric.metric}</h3>
                      <Badge className={`${getComplianceColor(metric.status)} text-white`}>
                        {metric.status === 'good' ? 'Compliant' : 
                         metric.status === 'warning' ? 'Warning' : 'Critical'}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Current</span>
                        <span>{metric.value}%</span>
                      </div>
                      <Progress value={metric.value} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Target: {metric.target}%</span>
                        <span>{metric.value >= metric.target ? 'Above target' : 'Below target'}</span>
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
              <CardDescription>Recent compliance issues and violations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 border rounded border-destructive/50 bg-destructive/5">
                  <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                  <div>
                    <p className="font-medium">Excessive Late Arrivals</p>
                    <p className="text-sm text-muted-foreground">
                      3 employees exceeded weekly late arrival limit (3 times)
                    </p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 border rounded border-warning/50 bg-warning/5">
                  <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                  <div>
                    <p className="font-medium">Attendance Rate Below Target</p>
                    <p className="text-sm text-muted-foreground">
                      Daily attendance rate dropped below 95% threshold
                    </p>
                    <p className="text-xs text-muted-foreground">4 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 border rounded border-success/50 bg-success/5">
                  <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                  <div>
                    <p className="font-medium">Break Compliance Maintained</p>
                    <p className="text-sm text-muted-foreground">
                      All employees took required breaks according to policy
                    </p>
                    <p className="text-xs text-muted-foreground">Yesterday</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure attendance alerts and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">Late Arrival Alerts</p>
                    <p className="text-sm text-muted-foreground">
                      Notify managers when employees arrive late
                    </p>
                  </div>
                  <Badge variant="default">Enabled</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">Absence Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Alert HR when employees don't clock in
                    </p>
                  </div>
                  <Badge variant="default">Enabled</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">Daily Reports</p>
                    <p className="text-sm text-muted-foreground">
                      Send daily attendance summary to managers
                    </p>
                  </div>
                  <Badge variant="secondary">Disabled</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
              <CardDescription>Latest attendance alerts sent</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { type: 'Late Arrival', employee: 'Tom Johnson', time: '10 minutes ago', status: 'sent' },
                  { type: 'No Show', employee: 'Alex Smith', time: '2 hours ago', status: 'sent' },
                  { type: 'Early Departure', employee: 'Lisa Brown', time: 'Yesterday', status: 'sent' }
                ].map((notification, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center gap-3">
                      <Bell className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{notification.type}</p>
                        <p className="text-sm text-muted-foreground">{notification.employee}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                      <Badge variant="outline" className="text-xs">
                        {notification.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
