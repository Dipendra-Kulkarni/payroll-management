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
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import {
  DollarSign,
  Calculator,
  FileText,
  Download,
  Users,
  Calendar,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Play,
  Pause,
  Filter,
  Search,
  Plus,
  Edit,
  Eye,
  CreditCard,
  PiggyBank,
  Receipt,
  Building,
  Shield,
  Clock,
  Percent
} from 'lucide-react';

const payrollPeriods = [
  {
    id: 'current',
    period: 'December 16-31, 2024',
    status: 'in_progress',
    employees: 16,
    totalHours: 640,
    grossPay: 48500,
    netPay: 37200,
    payDate: '2024-12-31'
  },
  {
    id: 'previous',
    period: 'December 1-15, 2024',
    status: 'completed',
    employees: 16,
    totalHours: 672,
    grossPay: 51200,
    netPay: 39300,
    payDate: '2024-12-15'
  }
];

const employees = [
  {
    id: 'EMP001',
    name: 'Sarah Wilson',
    avatar: '/placeholder.svg',
    department: 'Engineering',
    position: 'Senior Developer',
    payType: 'salary',
    payRate: 85000,
    hoursWorked: 80,
    regularHours: 80,
    overtimeHours: 0,
    grossPay: 3269.23,
    deductions: 892.50,
    netPay: 2376.73,
    taxWithheld: 654.23,
    benefits: 238.27,
    status: 'approved'
  },
  {
    id: 'EMP002',
    name: 'Mike Chen',
    avatar: '/placeholder.svg',
    department: 'Design',
    position: 'UI/UX Designer',
    payType: 'hourly',
    payRate: 45,
    hoursWorked: 78,
    regularHours: 78,
    overtimeHours: 0,
    grossPay: 3510,
    deductions: 956.73,
    netPay: 2553.27,
    taxWithheld: 702.00,
    benefits: 254.73,
    status: 'pending'
  },
  {
    id: 'EMP003',
    name: 'Emily Davis',
    avatar: '/placeholder.svg',
    department: 'Management',
    position: 'Engineering Manager',
    payType: 'salary',
    payRate: 120000,
    hoursWorked: 82,
    regularHours: 80,
    overtimeHours: 2,
    grossPay: 4615.38,
    deductions: 1257.85,
    netPay: 3357.53,
    taxWithheld: 923.08,
    benefits: 334.77,
    status: 'approved'
  }
];

const deductionTypes = [
  { id: 'federal_tax', name: 'Federal Income Tax', rate: 22, type: 'tax' },
  { id: 'state_tax', name: 'State Income Tax', rate: 5, type: 'tax' },
  { id: 'social_security', name: 'Social Security', rate: 6.2, type: 'tax' },
  { id: 'medicare', name: 'Medicare', rate: 1.45, type: 'tax' },
  { id: 'health_insurance', name: 'Health Insurance', amount: 350, type: 'benefit' },
  { id: 'dental_insurance', name: 'Dental Insurance', amount: 45, type: 'benefit' },
  { id: 'retirement_401k', name: '401(k) Contribution', rate: 6, type: 'benefit' }
];

const payrollReports = [
  { id: 'payroll_summary', name: 'Payroll Summary Report', description: 'Complete payroll overview', lastGenerated: '2024-12-15' },
  { id: 'tax_report', name: 'Tax Liability Report', description: 'Tax withholdings and liabilities', lastGenerated: '2024-12-15' },
  { id: 'benefits_report', name: 'Benefits Deduction Report', description: 'Employee benefits breakdown', lastGenerated: '2024-12-10' },
  { id: 'overtime_report', name: 'Overtime Analysis', description: 'Overtime costs and compliance', lastGenerated: '2024-12-12' }
];

export default function Payroll() {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('current');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [isProcessPayrollOpen, setIsProcessPayrollOpen] = useState(false);

  const currentPeriod = payrollPeriods.find(p => p.id === selectedPeriod);
  const filteredEmployees = employees.filter(emp => 
    (selectedDepartment === 'all' || emp.department === selectedDepartment) &&
    (searchTerm === '' || emp.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-success';
      case 'pending': return 'bg-warning';
      case 'rejected': return 'bg-destructive';
      case 'processing': return 'bg-primary';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payroll Management</h1>
          <p className="text-muted-foreground">
            Process payroll, manage compensation, and ensure compliance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Payroll
          </Button>
          <Dialog open={isProcessPayrollOpen} onOpenChange={setIsProcessPayrollOpen}>
            <DialogTrigger asChild>
              <Button>
                <Play className="h-4 w-4 mr-2" />
                Process Payroll
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Process Payroll</DialogTitle>
                <DialogDescription>
                  Run payroll processing for the current pay period
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-muted/50">
                  <h3 className="font-medium mb-2">Pay Period: {currentPeriod?.period}</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Employees</p>
                      <p className="font-medium">{currentPeriod?.employees}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Total Hours</p>
                      <p className="font-medium">{currentPeriod?.totalHours}h</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Gross Pay</p>
                      <p className="font-medium">${currentPeriod?.grossPay.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Net Pay</p>
                      <p className="font-medium">${currentPeriod?.netPay.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="pay-date">Pay Date</Label>
                  <Input id="pay-date" type="date" defaultValue={currentPeriod?.payDate} />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="auto-approve" />
                  <Label htmlFor="auto-approve">Auto-approve timesheets</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="send-notifications" defaultChecked />
                  <Label htmlFor="send-notifications">Send pay stub notifications</Label>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsProcessPayrollOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsProcessPayrollOpen(false)}>
                    Process Payroll
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Period Selector */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <Label htmlFor="period-select">Pay Period:</Label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {payrollPeriods.map((period) => (
                    <SelectItem key={period.id} value={period.id}>
                      {period.period}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="employees">Employee Pay</TabsTrigger>
          <TabsTrigger value="deductions">Deductions & Benefits</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Current Period Summary */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Gross Payroll</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${currentPeriod?.grossPay.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  Current pay period
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Net Payroll</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${currentPeriod?.netPay.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  After deductions
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentPeriod?.totalHours}h</div>
                <p className="text-xs text-muted-foreground">
                  All employees
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Employees</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentPeriod?.employees}</div>
                <p className="text-xs text-muted-foreground">
                  Active payroll
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Payroll Status */}
          <Card>
            <CardHeader>
              <CardTitle>Payroll Status</CardTitle>
              <CardDescription>
                Current pay period processing status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <div>
                      <p className="font-medium">Time Data Collection</p>
                      <p className="text-sm text-muted-foreground">All timesheets submitted and approved</p>
                    </div>
                  </div>
                  <Badge className="bg-success text-white">Complete</Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Calculator className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Payroll Calculations</p>
                      <p className="text-sm text-muted-foreground">Computing gross pay, deductions, and taxes</p>
                    </div>
                  </div>
                  <Badge className="bg-primary text-white">In Progress</Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Eye className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Review & Approval</p>
                      <p className="text-sm text-muted-foreground">Pending manager review</p>
                    </div>
                  </div>
                  <Badge variant="secondary">Pending</Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Payment Processing</p>
                      <p className="text-sm text-muted-foreground">Direct deposits and pay stubs</p>
                    </div>
                  </div>
                  <Badge variant="secondary">Pending</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common payroll tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Pay Stubs
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calculator className="h-4 w-4 mr-2" />
                    Run Payroll Preview
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Receipt className="h-4 w-4 mr-2" />
                    Process Tax Payments
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Export to Accounting
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest payroll actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { action: 'Payroll processed for Dec 1-15', time: '2 hours ago', status: 'success' },
                    { action: 'Tax deposits submitted', time: '1 day ago', status: 'success' },
                    { action: 'Benefits deductions updated', time: '2 days ago', status: 'info' },
                    { action: 'Overtime alert: Engineering Dept', time: '3 days ago', status: 'warning' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 border rounded">
                      <div className={`h-2 w-2 rounded-full ${
                        activity.status === 'success' ? 'bg-success' :
                        activity.status === 'warning' ? 'bg-warning' : 'bg-primary'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="employees" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Employee Payroll</CardTitle>
              <CardDescription>
                Individual employee pay details for {currentPeriod?.period}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredEmployees.map((employee) => (
                  <div key={employee.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={employee.avatar} />
                        <AvatarFallback>{employee.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{employee.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            {employee.id}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{employee.position} • {employee.department}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{employee.payType === 'salary' ? `$${employee.payRate.toLocaleString()}/year` : `$${employee.payRate}/hour`}</span>
                          <span>{employee.hoursWorked}h worked</span>
                          {employee.overtimeHours > 0 && (
                            <span className="text-warning">{employee.overtimeHours}h overtime</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right space-y-1">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Gross</p>
                          <p className="font-medium">${employee.grossPay.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Net</p>
                          <p className="font-medium">${employee.netPay.toLocaleString()}</p>
                        </div>
                        <Badge className={`${getStatusColor(employee.status)} text-white`}>
                          {employee.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deductions" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Tax Deductions</CardTitle>
                <CardDescription>Federal and state tax withholdings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deductionTypes.filter(d => d.type === 'tax').map((deduction) => (
                    <div key={deduction.id} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-3">
                        <Percent className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{deduction.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {deduction.rate}% of gross pay
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${(currentPeriod?.grossPay * deduction.rate / 100).toFixed(0)}</p>
                        <p className="text-xs text-muted-foreground">This period</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Benefits & Deductions</CardTitle>
                <CardDescription>Employee benefits and voluntary deductions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deductionTypes.filter(d => d.type === 'benefit').map((deduction) => (
                    <div key={deduction.id} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-3">
                        <PiggyBank className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{deduction.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {deduction.rate ? `${deduction.rate}% of gross` : `$${deduction.amount}/month`}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          ${deduction.amount ? 
                            deduction.amount : 
                            (currentPeriod?.grossPay * deduction.rate / 100).toFixed(0)
                          }
                        </p>
                        <p className="text-xs text-muted-foreground">Per employee</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Deduction Summary</CardTitle>
              <CardDescription>Total deductions for current pay period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-5 w-5 text-muted-foreground" />
                    <h3 className="font-medium">Total Tax Withholdings</h3>
                  </div>
                  <p className="text-2xl font-bold">$16,850</p>
                  <p className="text-sm text-muted-foreground">34.7% of gross pay</p>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <PiggyBank className="h-5 w-5 text-muted-foreground" />
                    <h3 className="font-medium">Benefits Deductions</h3>
                  </div>
                  <p className="text-2xl font-bold">$6,320</p>
                  <p className="text-sm text-muted-foreground">13.0% of gross pay</p>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Calculator className="h-5 w-5 text-muted-foreground" />
                    <h3 className="font-medium">Total Deductions</h3>
                  </div>
                  <p className="text-2xl font-bold">$23,170</p>
                  <p className="text-sm text-muted-foreground">47.7% of gross pay</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payroll Reports</CardTitle>
              <CardDescription>
                Generate comprehensive payroll and compliance reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {payrollReports.map((report) => (
                  <div key={report.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <h3 className="font-medium">{report.name}</h3>
                          <p className="text-sm text-muted-foreground">{report.description}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">
                        Last generated: {new Date(report.lastGenerated).toLocaleDateString()}
                      </p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-3 w-3 mr-1" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Payroll Analytics</CardTitle>
                <CardDescription>Key payroll metrics and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Pay per Employee</span>
                    <span className="font-medium">$3,031</span>
                  </div>
                  <Progress value={75} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Overtime Percentage</span>
                    <span className="font-medium">8.5%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Benefits Participation</span>
                    <span className="font-medium">94%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost Analysis</CardTitle>
                <CardDescription>Payroll cost breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { category: 'Base Salaries', amount: 38500, percentage: 79.4 },
                    { category: 'Overtime Pay', amount: 4200, percentage: 8.7 },
                    { category: 'Benefits Costs', amount: 3950, percentage: 8.1 },
                    { category: 'Employer Taxes', amount: 1850, percentage: 3.8 }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{item.category}</p>
                        <p className="text-xs text-muted-foreground">{item.percentage}% of total</p>
                      </div>
                      <p className="font-medium">${item.amount.toLocaleString()}</p>
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
                Labor law compliance and regulatory requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  { metric: 'Minimum Wage Compliance', status: 'compliant', value: '100%' },
                  { metric: 'Overtime Regulations', status: 'compliant', value: '98.5%' },
                  { metric: 'Tax Withholding Accuracy', status: 'compliant', value: '99.8%' },
                  { metric: 'Benefits Compliance', status: 'warning', value: '95.2%' }
                ].map((item, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{item.metric}</h3>
                      <Badge className={
                        item.status === 'compliant' ? 'bg-success text-white' :
                        item.status === 'warning' ? 'bg-warning text-white' : 'bg-destructive text-white'
                      }>
                        {item.status === 'compliant' ? 'Compliant' : 
                         item.status === 'warning' ? 'Warning' : 'Non-Compliant'}
                      </Badge>
                    </div>
                    <p className="text-2xl font-bold">{item.value}</p>
                    <Progress value={parseFloat(item.value)} className="mt-2 h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Compliance Alerts</CardTitle>
              <CardDescription>Recent compliance issues and actions needed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 border rounded border-success/50 bg-success/5">
                  <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                  <div>
                    <p className="font-medium">Tax Deposits Current</p>
                    <p className="text-sm text-muted-foreground">
                      All federal and state tax deposits are up to date
                    </p>
                    <p className="text-xs text-muted-foreground">Last updated: 2 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 border rounded border-warning/50 bg-warning/5">
                  <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                  <div>
                    <p className="font-medium">Benefits Enrollment Deadline</p>
                    <p className="text-sm text-muted-foreground">
                      Annual benefits enrollment period ends in 5 days
                    </p>
                    <p className="text-xs text-muted-foreground">Action required by: Dec 31, 2024</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 border rounded border-primary/50 bg-primary/5">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Quarterly Reports Ready</p>
                    <p className="text-sm text-muted-foreground">
                      Q4 payroll reports are ready for submission
                    </p>
                    <p className="text-xs text-muted-foreground">Due: January 15, 2025</p>
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
