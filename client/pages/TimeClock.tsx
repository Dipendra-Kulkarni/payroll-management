import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Clock,
  Play,
  Pause,
  Square,
  MapPin,
  Calendar,
  Timer,
  Coffee,
  Building,
  Smartphone,
  Monitor
} from 'lucide-react';

const projects = [
  { id: '1', name: 'Website Redesign', client: 'Acme Corp' },
  { id: '2', name: 'Mobile App', client: 'TechStart' },
  { id: '3', name: 'E-commerce Platform', client: 'RetailCo' },
  { id: '4', name: 'Internal Training', client: 'Internal' },
];

const locations = [
  { id: 'office', name: 'Main Office', address: '123 Business St' },
  { id: 'home', name: 'Remote/Home', address: 'Remote Work' },
  { id: 'client', name: 'Client Site', address: 'Client Location' },
];

export default function TimeClock() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isWorking, setIsWorking] = useState(true);
  const [onBreak, setOnBreak] = useState(false);
  const [sessionStart, setSessionStart] = useState(new Date(Date.now() - 2 * 60 * 60 * 1000));
  const [breakStart, setBreakStart] = useState<Date | null>(null);
  const [selectedProject, setSelectedProject] = useState('1');
  const [selectedLocation, setSelectedLocation] = useState('office');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDuration = (start: Date, end: Date = currentTime) => {
    const diff = end.getTime() - start.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleClockIn = () => {
    setSessionStart(new Date());
    setIsWorking(true);
    setOnBreak(false);
  };

  const handleClockOut = () => {
    setIsWorking(false);
    setOnBreak(false);
  };

  const handleBreak = () => {
    if (onBreak) {
      setOnBreak(false);
      setBreakStart(null);
    } else {
      setOnBreak(true);
      setBreakStart(new Date());
    }
  };

  const totalWorkedTime = isWorking ? formatDuration(sessionStart) : '00:00:00';
  const breakTime = onBreak && breakStart ? formatDuration(breakStart) : '00:00:00';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Time Clock</h1>
          <p className="text-muted-foreground">
            Track your work hours and manage your time
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Current Time</p>
          <p className="text-xl font-mono font-bold">
            {currentTime.toLocaleTimeString()}
          </p>
        </div>
      </div>

      {/* Main Clock Interface */}
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Current Session
          </CardTitle>
          <CardDescription>
            Manage your work session and track time
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Time Display */}
          <div className="text-center space-y-4">
            <div className="flex justify-center items-center gap-8">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Work Time</p>
                <div className="text-4xl font-mono font-bold text-primary">
                  {totalWorkedTime}
                </div>
              </div>
              {onBreak && (
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Break Time</p>
                  <div className="text-4xl font-mono font-bold text-warning">
                    {breakTime}
                  </div>
                </div>
              )}
            </div>

            {/* Status Badge */}
            <div className="flex justify-center">
              <Badge 
                variant={onBreak ? "secondary" : isWorking ? "default" : "outline"}
                className="px-4 py-2 text-sm"
              >
                {onBreak ? (
                  <>
                    <Coffee className="h-4 w-4 mr-1" />
                    On Break
                  </>
                ) : isWorking ? (
                  <>
                    <Timer className="h-4 w-4 mr-1" />
                    Working
                  </>
                ) : (
                  <>
                    <Square className="h-4 w-4 mr-1" />
                    Clocked Out
                  </>
                )}
              </Badge>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex justify-center gap-4">
            {!isWorking ? (
              <Button 
                size="lg" 
                onClick={handleClockIn}
                className="flex items-center gap-2"
              >
                <Play className="h-5 w-5" />
                Clock In
              </Button>
            ) : (
              <>
                <Button 
                  size="lg" 
                  variant="destructive"
                  onClick={handleClockOut}
                  className="flex items-center gap-2"
                >
                  <Square className="h-5 w-5" />
                  Clock Out
                </Button>
                <Button 
                  size="lg" 
                  variant={onBreak ? "default" : "outline"}
                  onClick={handleBreak}
                  className="flex items-center gap-2"
                >
                  {onBreak ? (
                    <>
                      <Play className="h-5 w-5" />
                      End Break
                    </>
                  ) : (
                    <>
                      <Pause className="h-5 w-5" />
                      Take Break
                    </>
                  )}
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Session Details */}
        <Card>
          <CardHeader>
            <CardTitle>Session Details</CardTitle>
            <CardDescription>Configure your work session</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="project">Project</Label>
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a project" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      <div>
                        <p className="font-medium">{project.name}</p>
                        <p className="text-sm text-muted-foreground">{project.client}</p>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location.id} value={location.id}>
                      <div className="flex items-center gap-2">
                        {location.id === 'office' && <Building className="h-4 w-4" />}
                        {location.id === 'home' && <Monitor className="h-4 w-4" />}
                        {location.id === 'client' && <MapPin className="h-4 w-4" />}
                        <div>
                          <p className="font-medium">{location.name}</p>
                          <p className="text-sm text-muted-foreground">{location.address}</p>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Session Notes</Label>
              <Textarea
                id="notes"
                placeholder="Add notes about your work session..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Today's Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Summary</CardTitle>
            <CardDescription>Your time breakdown for today</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Work Time</span>
                <span className="font-mono font-medium">7h 45m</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Break Time</span>
                <span className="font-mono font-medium">45m</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Billable Hours</span>
                <span className="font-mono font-medium">7h 30m</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Expected Hours</span>
                  <span className="font-mono font-medium">8h 00m</span>
                </div>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>Remaining</span>
                  <span className="font-mono">15m</span>
                </div>
              </div>
            </div>

            {/* Device Info */}
            <div className="pt-4 border-t">
              <h4 className="text-sm font-medium mb-2">Clock-in Method</h4>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Smartphone className="h-4 w-4" />
                Web Browser • Chrome
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                Main Office • 123 Business St
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Sessions</CardTitle>
          <CardDescription>Your recent clock-in/out history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { date: 'Today', clockIn: '9:00 AM', clockOut: 'In Progress', hours: '2h 45m', project: 'Website Redesign' },
              { date: 'Yesterday', clockIn: '8:45 AM', clockOut: '5:30 PM', hours: '8h 00m', project: 'Mobile App' },
              { date: 'Dec 16', clockIn: '9:15 AM', clockOut: '5:45 PM', hours: '7h 45m', project: 'E-commerce Platform' },
              { date: 'Dec 15', clockIn: '9:00 AM', clockOut: '6:00 PM', hours: '8h 15m', project: 'Website Redesign' },
            ].map((session, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                <div className="flex items-center gap-4">
                  <div className="text-sm font-medium w-20">{session.date}</div>
                  <div className="text-sm text-muted-foreground">
                    {session.clockIn} - {session.clockOut}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {session.project}
                  </Badge>
                </div>
                <div className="text-sm font-mono font-medium">{session.hours}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
