import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Clock,
  Play,
  Pause,
  Calendar,
  Users,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Timer,
  Coffee,
  MapPin,
  ChevronRight
} from 'lucide-react';

const timeEntries = [
  { date: 'Today', hours: 6.5, status: 'in-progress' },
  { date: 'Yesterday', hours: 8.0, status: 'completed' },
  { date: 'Monday', hours: 7.5, status: 'completed' },
  { date: 'Friday', hours: 8.0, status: 'completed' },
];

const upcomingSchedule = [
  { time: '9:00 AM', task: 'Team Standup', type: 'meeting' },
  { time: '11:30 AM', task: 'Client Review', type: 'meeting' },
  { time: '2:00 PM', task: 'Project Planning', type: 'work' },
  { time: '4:30 PM', task: 'Code Review', type: 'review' },
];

const teamStatus = [
  { name: 'Sarah Wilson', status: 'working', avatar: '/placeholder.svg', time: '2h 30m' },
  { name: 'Mike Chen', status: 'break', avatar: '/placeholder.svg', time: '15m' },
  { name: 'Emily Davis', status: 'working', avatar: '/placeholder.svg', time: '4h 15m' },
  { name: 'Tom Johnson', status: 'offline', avatar: '/placeholder.svg', time: '' },
];

const pendingRequests = [
  { employee: 'Sarah Wilson', type: 'Vacation', dates: 'Dec 20-22', status: 'pending' },
  { employee: 'Mike Chen', type: 'Sick Leave', dates: 'Dec 18', status: 'approved' },
  { employee: 'Emily Davis', type: 'Personal', dates: 'Dec 25', status: 'pending' },
];

export default function Dashboard() {
  const [isWorking, setIsWorking] = useState(true);
  const [currentSession, setCurrentSession] = useState('2h 15m');

  const handleClockToggle = () => {
    setIsWorking(!isWorking);
    // In a real app, this would call an API
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, John. Here's your overview for today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-success/10 text-success border-success/20">
            <div className="h-1.5 w-1.5 rounded-full bg-success mr-1" />
            Online
          </Badge>
        </div>
      </div>

      {/* Time Clock Section */}
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Time Clock
          </CardTitle>
          <CardDescription>
            Current session and quick actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold text-primary">
                  {currentSession}
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Current session</p>
                  <p className="text-sm">Started: 9:00 AM</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                Office - Main Building
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                size="lg"
                variant={isWorking ? "destructive" : "default"}
                onClick={handleClockToggle}
                className="flex items-center gap-2"
              >
                {isWorking ? (
                  <>
                    <Pause className="h-5 w-5" />
                    Clock Out
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5" />
                    Clock In
                  </>
                )}
              </Button>
              <Button variant="outline" size="lg" className="flex items-center gap-2">
                <Coffee className="h-4 w-4" />
                Break
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Timer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32.5h</div>
            <p className="text-xs text-muted-foreground">
              +2.5h from last week
            </p>
            <Progress value={81.25} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overtime</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.5h</div>
            <p className="text-xs text-muted-foreground">
              This week
            </p>
            <Badge variant="outline" className="mt-2 text-xs">
              Under limit
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Online</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              out of 16 members
            </p>
            <div className="flex -space-x-1 mt-2">
              {teamStatus.slice(0, 4).map((member, i) => (
                <Avatar key={i} className="h-6 w-6 border-2 border-background">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback className="text-xs">{member.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Need approval
            </p>
            <Badge variant="destructive" className="mt-2 text-xs">
              Action needed
            </Badge>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Time Entries */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Time Entries</CardTitle>
            <CardDescription>Your recent work sessions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {timeEntries.map((entry, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`h-2 w-2 rounded-full ${
                    entry.status === 'in-progress' ? 'bg-primary animate-pulse' : 'bg-success'
                  }`} />
                  <div>
                    <p className="text-sm font-medium">{entry.date}</p>
                    <p className="text-xs text-muted-foreground">
                      {entry.status === 'in-progress' ? 'In progress' : 'Completed'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{entry.hours}h</p>
                  {entry.status === 'in-progress' && (
                    <p className="text-xs text-primary">Active</p>
                  )}
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4">
              View All Entries
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>Your upcoming tasks and meetings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingSchedule.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="text-sm font-medium text-muted-foreground w-20">
                  {item.time}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.task}</p>
                  <Badge variant="outline" className="text-xs mt-1">
                    {item.type}
                  </Badge>
                </div>
                <Button variant="ghost" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4">
              View Full Schedule
              <Calendar className="h-4 w-4 ml-1" />
            </Button>
          </CardContent>
        </Card>

        {/* Team Status */}
        <Card>
          <CardHeader>
            <CardTitle>Team Status</CardTitle>
            <CardDescription>Current team activity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {teamStatus.map((member, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{member.name}</p>
                    <div className="flex items-center gap-1">
                      <div className={`h-1.5 w-1.5 rounded-full ${
                        member.status === 'working' ? 'bg-success' :
                        member.status === 'break' ? 'bg-warning' : 'bg-muted-foreground'
                      }`} />
                      <p className="text-xs text-muted-foreground capitalize">
                        {member.status}
                      </p>
                    </div>
                  </div>
                </div>
                {member.time && (
                  <p className="text-sm text-muted-foreground">{member.time}</p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Pending Leave Requests */}
        <Card>
          <CardHeader>
            <CardTitle>Leave Requests</CardTitle>
            <CardDescription>Requests requiring your approval</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingRequests.map((request, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{request.employee}</p>
                  <p className="text-xs text-muted-foreground">
                    {request.type} • {request.dates}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={request.status === 'pending' ? 'secondary' : 'default'}>
                    {request.status}
                  </Badge>
                  {request.status === 'pending' && (
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" className="h-6 px-2">
                        <CheckCircle className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="h-6 px-2">
                        <AlertCircle className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4">
              View All Requests
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
