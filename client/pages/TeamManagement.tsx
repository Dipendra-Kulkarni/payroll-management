import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import {
  Users,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  UserPlus,
  Shield,
  Building,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Settings,
  Eye,
  MoreHorizontal,
  Crown,
  User,
  CheckCircle,
  XCircle
} from 'lucide-react';

const employees = [
  {
    id: 'EMP001',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@company.com',
    phone: '+1 (555) 123-4567',
    avatar: '/placeholder.svg',
    department: 'Engineering',
    role: 'Senior Developer',
    level: 'Senior',
    manager: 'Emily Davis',
    location: 'San Francisco, CA',
    startDate: '2022-03-15',
    status: 'active',
    permissions: ['time_tracking', 'project_access', 'report_viewing'],
    lastActive: '2024-12-18T10:30:00'
  },
  {
    id: 'EMP002',
    name: 'Mike Chen',
    email: 'mike.chen@company.com',
    phone: '+1 (555) 234-5678',
    avatar: '/placeholder.svg',
    department: 'Design',
    role: 'UI/UX Designer',
    level: 'Mid',
    manager: 'Emily Davis',
    location: 'Remote',
    startDate: '2023-01-20',
    status: 'active',
    permissions: ['time_tracking', 'project_access'],
    lastActive: '2024-12-18T09:15:00'
  },
  {
    id: 'EMP003',
    name: 'Emily Davis',
    email: 'emily.davis@company.com',
    phone: '+1 (555) 345-6789',
    avatar: '/placeholder.svg',
    department: 'Management',
    role: 'Engineering Manager',
    level: 'Manager',
    manager: null,
    location: 'San Francisco, CA',
    startDate: '2021-08-10',
    status: 'active',
    permissions: ['time_tracking', 'project_access', 'report_viewing', 'user_management', 'approval_authority'],
    lastActive: '2024-12-18T11:20:00'
  },
  {
    id: 'EMP004',
    name: 'Tom Johnson',
    email: 'tom.johnson@company.com',
    phone: '+1 (555) 456-7890',
    avatar: '/placeholder.svg',
    department: 'Engineering',
    role: 'Junior Developer',
    level: 'Junior',
    manager: 'Emily Davis',
    location: 'Austin, TX',
    startDate: '2023-09-01',
    status: 'active',
    permissions: ['time_tracking', 'project_access'],
    lastActive: '2024-12-18T08:45:00'
  },
  {
    id: 'EMP005',
    name: 'Lisa Brown',
    email: 'lisa.brown@company.com',
    phone: '+1 (555) 567-8901',
    avatar: '/placeholder.svg',
    department: 'HR',
    role: 'HR Specialist',
    level: 'Mid',
    manager: 'John Smith',
    location: 'New York, NY',
    startDate: '2022-11-15',
    status: 'inactive',
    permissions: ['time_tracking', 'user_management'],
    lastActive: '2024-12-15T16:30:00'
  }
];

const departments = [
  {
    id: 'eng',
    name: 'Engineering',
    manager: 'Emily Davis',
    employeeCount: 8,
    budget: 850000,
    description: 'Software development and technical operations'
  },
  {
    id: 'design',
    name: 'Design',
    manager: 'Alex Johnson',
    employeeCount: 4,
    budget: 320000,
    description: 'User experience and visual design'
  },
  {
    id: 'hr',
    name: 'Human Resources',
    manager: 'John Smith',
    employeeCount: 3,
    budget: 240000,
    description: 'People operations and talent management'
  },
  {
    id: 'management',
    name: 'Management',
    manager: 'CEO',
    employeeCount: 2,
    budget: 450000,
    description: 'Executive leadership and strategic planning'
  }
];

const roles = [
  { id: 'admin', name: 'Administrator', level: 'high', permissions: ['all'] },
  { id: 'manager', name: 'Manager', level: 'high', permissions: ['user_management', 'approval_authority', 'report_viewing', 'time_tracking', 'project_access'] },
  { id: 'supervisor', name: 'Supervisor', level: 'medium', permissions: ['approval_authority', 'report_viewing', 'time_tracking', 'project_access'] },
  { id: 'employee', name: 'Employee', level: 'low', permissions: ['time_tracking', 'project_access'] }
];

const permissions = [
  { id: 'time_tracking', name: 'Time Tracking', description: 'Clock in/out and manage timesheets' },
  { id: 'project_access', name: 'Project Access', description: 'View and work on assigned projects' },
  { id: 'report_viewing', name: 'Report Viewing', description: 'Access attendance and productivity reports' },
  { id: 'user_management', name: 'User Management', description: 'Manage employee accounts and profiles' },
  { id: 'approval_authority', name: 'Approval Authority', description: 'Approve leave requests and timesheets' },
  { id: 'system_settings', name: 'System Settings', description: 'Configure system-wide settings' }
];

export default function TeamManagement() {
  const [selectedTab, setSelectedTab] = useState('directory');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedRole, setSelectedRole] = useState('all');
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const filteredEmployees = employees.filter(emp => 
    (selectedDepartment === 'all' || emp.department === selectedDepartment) &&
    (selectedRole === 'all' || emp.level === selectedRole) &&
    (searchTerm === '' || 
     emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
     emp.role.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success';
      case 'inactive': return 'bg-muted';
      case 'suspended': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Manager': return 'bg-purple-500';
      case 'Senior': return 'bg-blue-500';
      case 'Mid': return 'bg-green-500';
      case 'Junior': return 'bg-orange-500';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team Management</h1>
          <p className="text-muted-foreground">
            Manage team members, roles, and organizational structure
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Bulk Actions
          </Button>
          <Dialog open={isAddEmployeeOpen} onOpenChange={setIsAddEmployeeOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Add Employee
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Employee</DialogTitle>
                <DialogDescription>
                  Create a new employee account and set up their profile
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emp-name">Full Name</Label>
                  <Input id="emp-name" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emp-email">Email</Label>
                  <Input id="emp-email" type="email" placeholder="john.doe@company.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emp-phone">Phone</Label>
                  <Input id="emp-phone" placeholder="+1 (555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emp-department">Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept.id} value={dept.id}>
                          {dept.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emp-role">Role</Label>
                  <Input id="emp-role" placeholder="Software Engineer" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emp-level">Level</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Junior">Junior</SelectItem>
                      <SelectItem value="Mid">Mid</SelectItem>
                      <SelectItem value="Senior">Senior</SelectItem>
                      <SelectItem value="Manager">Manager</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emp-manager">Manager</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select manager" />
                    </SelectTrigger>
                    <SelectContent>
                      {employees.filter(emp => emp.level === 'Manager').map((manager) => (
                        <SelectItem key={manager.id} value={manager.id}>
                          {manager.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emp-start">Start Date</Label>
                  <Input id="emp-start" type="date" />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddEmployeeOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddEmployeeOpen(false)}>
                  Add Employee
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="directory">Employee Directory</TabsTrigger>
          <TabsTrigger value="hierarchy">Team Hierarchy</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="permissions">Roles & Permissions</TabsTrigger>
        </TabsList>

        <TabsContent value="directory" className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search employees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="dept-filter">Department:</Label>
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
                  <Label htmlFor="role-filter">Level:</Label>
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="Manager">Manager</SelectItem>
                      <SelectItem value="Senior">Senior</SelectItem>
                      <SelectItem value="Mid">Mid</SelectItem>
                      <SelectItem value="Junior">Junior</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Employee Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredEmployees.map((employee) => (
              <Card key={employee.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={employee.avatar} />
                        <AvatarFallback>{employee.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{employee.name}</h3>
                        <p className="text-sm text-muted-foreground">{employee.role}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{employee.department}</span>
                      <Badge className={`${getLevelColor(employee.level)} text-white text-xs`}>
                        {employee.level}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{employee.email}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{employee.location}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Reports to: {employee.manager || 'CEO'}</span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <Badge className={`${getStatusColor(employee.status)} text-white`}>
                        {employee.status}
                      </Badge>
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="hierarchy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Organizational Hierarchy</CardTitle>
              <CardDescription>
                Visual representation of team structure and reporting relationships
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* CEO Level */}
              <div className="text-center mb-8">
                <div className="inline-block p-4 border-2 border-primary rounded-lg bg-primary/5">
                  <div className="flex items-center gap-3">
                    <Crown className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-semibold">CEO</h3>
                      <p className="text-sm text-muted-foreground">Chief Executive Officer</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Department Managers */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
                {departments.map((dept) => (
                  <div key={dept.id} className="text-center">
                    <div className="p-4 border rounded-lg bg-muted/30">
                      <div className="flex items-center gap-2 justify-center mb-2">
                        <Building className="h-5 w-5 text-muted-foreground" />
                        <h4 className="font-medium">{dept.name}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{dept.manager}</p>
                      <Badge variant="outline" className="text-xs">
                        {dept.employeeCount} employees
                      </Badge>
                    </div>

                    {/* Direct Reports */}
                    <div className="mt-4 space-y-2">
                      {employees
                        .filter(emp => emp.department === dept.name && emp.level !== 'Manager')
                        .slice(0, 3)
                        .map((emp) => (
                          <div key={emp.id} className="p-2 border rounded text-xs bg-background">
                            <p className="font-medium">{emp.name}</p>
                            <p className="text-muted-foreground">{emp.role}</p>
                          </div>
                        ))}
                      {employees.filter(emp => emp.department === dept.name && emp.level !== 'Manager').length > 3 && (
                        <p className="text-xs text-muted-foreground">
                          +{employees.filter(emp => emp.department === dept.name && emp.level !== 'Manager').length - 3} more
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {departments.map((dept) => {
              const deptEmployees = employees.filter(emp => emp.department === dept.name);
              return (
                <Card key={dept.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Building className="h-5 w-5" />
                        {dept.name}
                      </CardTitle>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                    <CardDescription>{dept.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Manager</p>
                          <p className="font-medium">{dept.manager}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Employees</p>
                          <p className="font-medium">{dept.employeeCount}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Budget</p>
                          <p className="font-medium">${dept.budget.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Active</p>
                          <p className="font-medium">{deptEmployees.filter(emp => emp.status === 'active').length}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Team Members</p>
                        <div className="flex -space-x-2">
                          {deptEmployees.slice(0, 5).map((emp) => (
                            <Avatar key={emp.id} className="h-8 w-8 border-2 border-background">
                              <AvatarImage src={emp.avatar} />
                              <AvatarFallback className="text-xs">{emp.name.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                          ))}
                          {deptEmployees.length > 5 && (
                            <div className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                              <span className="text-xs">+{deptEmployees.length - 5}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-6">
          {/* Role Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Role Management</CardTitle>
              <CardDescription>
                Manage user roles and permission levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {roles.map((role) => (
                  <div key={role.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-muted-foreground" />
                        <h3 className="font-medium">{role.name}</h3>
                      </div>
                      <Badge variant={role.level === 'high' ? 'default' : role.level === 'medium' ? 'secondary' : 'outline'}>
                        {role.level} access
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Permissions:</p>
                      <div className="flex flex-wrap gap-1">
                        {role.permissions.slice(0, 3).map((perm) => (
                          <Badge key={perm} variant="outline" className="text-xs">
                            {perm.replace('_', ' ')}
                          </Badge>
                        ))}
                        {role.permissions.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{role.permissions.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Permission Details */}
          <Card>
            <CardHeader>
              <CardTitle>Permission Matrix</CardTitle>
              <CardDescription>
                Detailed permission settings for each role
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Permission</th>
                      <th className="text-center p-2">Admin</th>
                      <th className="text-center p-2">Manager</th>
                      <th className="text-center p-2">Supervisor</th>
                      <th className="text-center p-2">Employee</th>
                    </tr>
                  </thead>
                  <tbody>
                    {permissions.map((permission) => (
                      <tr key={permission.id} className="border-b">
                        <td className="p-2">
                          <div>
                            <p className="font-medium text-sm">{permission.name}</p>
                            <p className="text-xs text-muted-foreground">{permission.description}</p>
                          </div>
                        </td>
                        {roles.map((role) => (
                          <td key={role.id} className="p-2 text-center">
                            {(role.permissions.includes('all') || role.permissions.includes(permission.id)) ? (
                              <CheckCircle className="h-4 w-4 text-success mx-auto" />
                            ) : (
                              <XCircle className="h-4 w-4 text-muted-foreground mx-auto" />
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Individual Permissions */}
          <Card>
            <CardHeader>
              <CardTitle>Individual Permission Overrides</CardTitle>
              <CardDescription>
                Custom permissions for specific employees
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {employees.slice(0, 3).map((employee) => (
                  <div key={employee.id} className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={employee.avatar} />
                        <AvatarFallback>{employee.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{employee.name}</p>
                        <p className="text-sm text-muted-foreground">{employee.role}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {employee.permissions.length} permissions
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Settings className="h-3 w-3 mr-1" />
                        Configure
                      </Button>
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
