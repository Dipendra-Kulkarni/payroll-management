import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  Calendar,
  Plus,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  FileText,
  Filter,
  Search,
  Download,
  MoreHorizontal,
  Plane,
  Heart,
  Briefcase,
  Home
} from 'lucide-react';

const leaveTypes = [
  { id: 'vacation', name: 'Vacation', icon: Plane, color: 'bg-blue-500', allowance: 25 },
  { id: 'sick', name: 'Sick Leave', icon: Heart, color: 'bg-red-500', allowance: 10 },
  { id: 'personal', name: 'Personal', icon: User, color: 'bg-green-500', allowance: 5 },
  { id: 'maternity', name: 'Maternity/Paternity', icon: Home, color: 'bg-purple-500', allowance: 90 },
  { id: 'bereavement', name: 'Bereavement', icon: Heart, color: 'bg-gray-500', allowance: 3 },
  { id: 'other', name: 'Other', icon: Briefcase, color: 'bg-orange-500', allowance: 0 },
];

const leaveRequests = [
  {
    id: '1',
    employee: { name: 'Sarah Wilson', avatar: '/placeholder.svg', department: 'Engineering' },
    type: 'vacation',
    startDate: '2024-12-20',
    endDate: '2024-12-22',
    days: 3,
    status: 'pending',
    reason: 'Family vacation during holidays',
    requestDate: '2024-12-10',
    documents: ['vacation-plan.pdf']
  },
  {
    id: '2',
    employee: { name: 'Mike Chen', avatar: '/placeholder.svg', department: 'Design' },
    type: 'sick',
    startDate: '2024-12-18',
    endDate: '2024-12-18',
    days: 1,
    status: 'approved',
    reason: 'Doctor appointment',
    requestDate: '2024-12-17',
    documents: ['medical-certificate.pdf']
  },
  {
    id: '3',
    employee: { name: 'Emily Davis', avatar: '/placeholder.svg', department: 'Management' },
    type: 'personal',
    startDate: '2024-12-25',
    endDate: '2024-12-25',
    days: 1,
    status: 'pending',
    reason: 'Personal business',
    requestDate: '2024-12-15',
    documents: []
  },
  {
    id: '4',
    employee: { name: 'Tom Johnson', avatar: '/placeholder.svg', department: 'Engineering' },
    type: 'vacation',
    startDate: '2024-12-30',
    endDate: '2025-01-05',
    days: 7,
    status: 'rejected',
    reason: 'Year-end vacation',
    requestDate: '2024-12-12',
    rejectionReason: 'Too many team members already on leave during this period',
    documents: []
  }
];

const myLeaveBalance = {
  vacation: { used: 18, total: 25 },
  sick: { used: 2, total: 10 },
  personal: { used: 3, total: 5 },
  maternity: { used: 0, total: 90 },
  bereavement: { used: 0, total: 3 },
};

export default function LeaveManagement() {
  const [selectedTab, setSelectedTab] = useState('requests');
  const [isCreateRequestOpen, setIsCreateRequestOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRequests = leaveRequests.filter(request => 
    (filterStatus === 'all' || request.status === filterStatus) &&
    (filterType === 'all' || request.type === filterType) &&
    (searchTerm === '' || request.employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     request.reason.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getLeaveTypeById = (typeId: string) => leaveTypes.find(t => t.id === typeId);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-success';
      case 'rejected': return 'bg-destructive';
      case 'pending': return 'bg-warning';
      default: return 'bg-muted';
    }
  };

  const handleApproveRequest = (requestId: string) => {
    // In a real app, this would call an API
    console.log('Approving request:', requestId);
  };

  const handleRejectRequest = (requestId: string) => {
    // In a real app, this would call an API
    console.log('Rejecting request:', requestId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leave Management</h1>
          <p className="text-muted-foreground">
            Manage leave requests and track employee balances
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Dialog open={isCreateRequestOpen} onOpenChange={setIsCreateRequestOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Request
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Submit Leave Request</DialogTitle>
                <DialogDescription>
                  Create a new leave request for approval
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="leave-type">Leave Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select leave type" />
                    </SelectTrigger>
                    <SelectContent>
                      {leaveTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          <div className="flex items-center gap-2">
                            <type.icon className="h-4 w-4" />
                            {type.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Start Date</Label>
                    <Input id="start-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-date">End Date</Label>
                    <Input id="end-date" type="date" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reason">Reason</Label>
                  <Textarea
                    id="reason"
                    placeholder="Please provide a reason for your leave request..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="documents">Supporting Documents</Label>
                  <Input id="documents" type="file" multiple />
                  <p className="text-xs text-muted-foreground">
                    Upload any supporting documents (medical certificates, etc.)
                  </p>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsCreateRequestOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsCreateRequestOpen(false)}>
                    Submit Request
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="requests">Leave Requests</TabsTrigger>
          <TabsTrigger value="balance">My Balance</TabsTrigger>
          <TabsTrigger value="calendar">Leave Calendar</TabsTrigger>
          <TabsTrigger value="policies">Policies</TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="status-filter">Status:</Label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <Label htmlFor="type-filter">Type:</Label>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      {leaveTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search requests..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-48"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Requests List */}
          <div className="space-y-4">
            {filteredRequests.map((request) => {
              const leaveType = getLeaveTypeById(request.type);
              const IconComponent = leaveType?.icon || FileText;
              
              return (
                <Card key={request.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarImage src={request.employee.avatar} />
                          <AvatarFallback>{request.employee.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{request.employee.name}</h3>
                            <Badge variant="outline" className="text-xs">
                              {request.employee.department}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <IconComponent className="h-4 w-4" />
                              {leaveType?.name}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {request.startDate} - {request.endDate}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {request.days} day{request.days > 1 ? 's' : ''}
                            </div>
                          </div>
                          
                          <p className="text-sm">{request.reason}</p>
                          
                          {request.documents.length > 0 && (
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">
                                {request.documents.length} document{request.documents.length > 1 ? 's' : ''} attached
                              </span>
                            </div>
                          )}

                          {request.status === 'rejected' && request.rejectionReason && (
                            <div className="mt-2 p-2 bg-destructive/10 rounded border border-destructive/20">
                              <p className="text-sm text-destructive">
                                <strong>Rejection Reason:</strong> {request.rejectionReason}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge className={`${getStatusColor(request.status)} text-white`}>
                          {request.status === 'approved' && <CheckCircle className="h-3 w-3 mr-1" />}
                          {request.status === 'rejected' && <XCircle className="h-3 w-3 mr-1" />}
                          {request.status === 'pending' && <AlertCircle className="h-3 w-3 mr-1" />}
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </Badge>
                        
                        {request.status === 'pending' && (
                          <div className="flex gap-1">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleApproveRequest(request.id)}
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Approve
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleRejectRequest(request.id)}
                            >
                              <XCircle className="h-3 w-3 mr-1" />
                              Reject
                            </Button>
                          </div>
                        )}
                        
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="balance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Leave Balance</CardTitle>
              <CardDescription>
                Your current leave allowances and usage for this year
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {leaveTypes.filter(type => type.allowance > 0).map((type) => {
                  const balance = myLeaveBalance[type.id as keyof typeof myLeaveBalance];
                  const used = balance?.used || 0;
                  const total = balance?.total || type.allowance;
                  const remaining = total - used;
                  const usagePercentage = (used / total) * 100;
                  
                  return (
                    <Card key={type.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`p-2 rounded ${type.color} text-white`}>
                            <type.icon className="h-4 w-4" />
                          </div>
                          <div>
                            <h3 className="font-medium">{type.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {remaining} days remaining
                            </p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Used</span>
                            <span>{used} / {total} days</span>
                          </div>
                          <Progress value={usagePercentage} className="h-2" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>{usagePercentage.toFixed(0)}% used</span>
                            <span>{remaining} days left</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Leave */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Leave</CardTitle>
              <CardDescription>
                Your approved leave requests for the next 3 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaveRequests
                  .filter(req => req.status === 'approved' && req.employee.name === 'John Doe')
                  .map((request) => {
                    const leaveType = getLeaveTypeById(request.type);
                    const IconComponent = leaveType?.icon || FileText;
                    
                    return (
                      <div key={request.id} className="flex items-center justify-between p-3 border rounded">
                        <div className="flex items-center gap-3">
                          <IconComponent className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{leaveType?.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {request.startDate} - {request.endDate} ({request.days} days)
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                          Approved
                        </Badge>
                      </div>
                    );
                  })}
                
                {leaveRequests.filter(req => req.status === 'approved' && req.employee.name === 'John Doe').length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No upcoming leave scheduled
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Leave Calendar</CardTitle>
              <CardDescription>
                View team leave schedule and plan accordingly
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <Calendar className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">Calendar View</h3>
                <p className="max-w-sm mx-auto">
                  Interactive calendar showing all team leave requests and approved time off would be displayed here.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="policies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Leave Policies</CardTitle>
              <CardDescription>
                Company leave policies and guidelines
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {leaveTypes.map((type) => (
                  <div key={type.id} className="border-l-4 border-l-primary pl-4">
                    <div className="flex items-center gap-2 mb-2">
                      <type.icon className="h-4 w-4" />
                      <h3 className="font-medium">{type.name}</h3>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p><strong>Annual Allowance:</strong> {type.allowance} days</p>
                      <p><strong>Notice Period:</strong> {type.id === 'sick' ? 'Same day' : '2 weeks in advance'}</p>
                      <p><strong>Documentation:</strong> {type.id === 'sick' ? 'Medical certificate required for >2 days' : 'None required'}</p>
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
