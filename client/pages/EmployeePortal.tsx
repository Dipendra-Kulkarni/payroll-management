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
import { Progress } from "@/components/ui/progress";
import { PayStub } from "@/components/PayStub";
import {
  FileText,
  Download,
  DollarSign,
  Calendar,
  TrendingUp,
  Eye,
  PiggyBank,
  CreditCard,
  Receipt,
  Building,
  Clock,
  Target,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

const payStubs = [
  {
    id: "2024-12-31",
    period: "Dec 16-31, 2024",
    payDate: "2024-12-31",
    grossPay: 3269.23,
    netPay: 2376.73,
    status: "current",
  },
  {
    id: "2024-12-15",
    period: "Dec 1-15, 2024",
    payDate: "2024-12-15",
    grossPay: 3269.23,
    netPay: 2376.73,
    status: "paid",
  },
  {
    id: "2024-11-30",
    period: "Nov 16-30, 2024",
    payDate: "2024-11-30",
    grossPay: 3269.23,
    netPay: 2376.73,
    status: "paid",
  },
  {
    id: "2024-11-15",
    period: "Nov 1-15, 2024",
    payDate: "2024-11-15",
    grossPay: 3269.23,
    netPay: 2376.73,
    status: "paid",
  },
];

const taxDocuments = [
  {
    id: "w2-2024",
    name: "W-2 Tax Form 2024",
    year: "2024",
    available: false,
    availableDate: "2025-01-31",
  },
  {
    id: "w2-2023",
    name: "W-2 Tax Form 2023",
    year: "2023",
    available: true,
    downloadUrl: "#",
  },
  {
    id: "1099-2023",
    name: "1099 Form 2023",
    year: "2023",
    available: true,
    downloadUrl: "#",
  },
];

const benefitsEnrollment = [
  {
    id: "health",
    name: "Health Insurance",
    enrolled: true,
    cost: 350,
    coverage: "Employee + Family",
  },
  {
    id: "dental",
    name: "Dental Insurance",
    enrolled: true,
    cost: 45,
    coverage: "Employee + Family",
  },
  {
    id: "vision",
    name: "Vision Insurance",
    enrolled: false,
    cost: 25,
    coverage: "Not Enrolled",
  },
  {
    id: "401k",
    name: "401(k) Retirement",
    enrolled: true,
    cost: 195.38,
    coverage: "6% of salary",
  },
  {
    id: "life",
    name: "Life Insurance",
    enrolled: true,
    cost: 12,
    coverage: "$50,000",
  },
];

const samplePayStubData = {
  employee: {
    name: "John Doe",
    id: "EMP001",
    department: "Engineering",
    position: "Senior Developer",
    address: "123 Main St, San Francisco, CA 94105",
  },
  payPeriod: {
    start: "Dec 16, 2024",
    end: "Dec 31, 2024",
    payDate: "2024-12-31",
  },
  earnings: {
    regularHours: 80,
    regularRate: 40.87,
    regularPay: 3269.23,
    overtimeHours: 0,
    overtimeRate: 61.31,
    overtimePay: 0,
    bonuses: 0,
    commissions: 0,
    grossPay: 3269.23,
  },
  deductions: {
    federalTax: 654.23,
    stateTax: 163.46,
    socialSecurity: 202.69,
    medicare: 47.4,
    healthInsurance: 350.0,
    dentalInsurance: 45.0,
    retirement401k: 195.38,
    totalDeductions: 892.5,
  },
  netPay: 2376.73,
  ytdTotals: {
    grossPay: 85000,
    totalDeductions: 23220,
    netPay: 61780,
  },
};

export default function EmployeePortal() {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedPayStub, setSelectedPayStub] = useState(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Employee Portal</h1>
          <p className="text-muted-foreground">
            Access your pay information, benefits, and tax documents
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download All
          </Button>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="paystubs">Pay Stubs</TabsTrigger>
          <TabsTrigger value="benefits">Benefits</TabsTrigger>
          <TabsTrigger value="taxes">Tax Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Current Pay Period */}
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Current Pay Period
              </CardTitle>
              <CardDescription>
                December 16-31, 2024 • Pay Date: December 31, 2024
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Estimated Gross Pay
                  </p>
                  <p className="text-3xl font-bold text-primary">$3,269</p>
                  <p className="text-sm text-muted-foreground">
                    Based on 80 hours
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Estimated Deductions
                  </p>
                  <p className="text-2xl font-bold">$892</p>
                  <p className="text-sm text-muted-foreground">
                    Taxes & Benefits
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Estimated Net Pay
                  </p>
                  <p className="text-3xl font-bold text-success">$2,377</p>
                  <Badge className="mt-2 bg-primary text-white">
                    Processing
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Year-to-Date Summary */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  YTD Gross Pay
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$85,000</div>
                <p className="text-xs text-muted-foreground">
                  Annual salary achieved
                </p>
                <Progress value={100} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  YTD Deductions
                </CardTitle>
                <Receipt className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$23,220</div>
                <p className="text-xs text-muted-foreground">
                  27.3% of gross pay
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  YTD Net Pay
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$61,780</div>
                <p className="text-xs text-muted-foreground">Take-home pay</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  401(k) Balance
                </CardTitle>
                <PiggyBank className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,280</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1 text-success" />
                  +12.3% this year
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Pay Stubs</CardTitle>
                <CardDescription>Your last 3 pay periods</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {payStubs.slice(0, 3).map((stub) => (
                    <div
                      key={stub.id}
                      className="flex items-center justify-between p-3 border rounded"
                    >
                      <div>
                        <p className="font-medium">{stub.period}</p>
                        <p className="text-sm text-muted-foreground">
                          Paid: {new Date(stub.payDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          ${stub.netPay.toLocaleString()}
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              stub.status === "current"
                                ? "secondary"
                                : "outline"
                            }
                            className="text-xs"
                          >
                            {stub.status}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Benefits Snapshot</CardTitle>
                <CardDescription>Current benefit enrollments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {benefitsEnrollment
                    .filter((b) => b.enrolled)
                    .map((benefit) => (
                      <div
                        key={benefit.id}
                        className="flex items-center justify-between p-3 border rounded"
                      >
                        <div>
                          <p className="font-medium">{benefit.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {benefit.coverage}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${benefit.cost}/month</p>
                          <Badge
                            variant="default"
                            className="text-xs bg-success text-white"
                          >
                            Enrolled
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="paystubs" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Pay Stubs</CardTitle>
                  <CardDescription>
                    View and download your pay statements
                  </CardDescription>
                </div>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {payStubs.map((stub) => (
                  <div
                    key={stub.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <FileText className="h-8 w-8 text-primary" />
                      <div>
                        <h3 className="font-medium">{stub.period}</h3>
                        <p className="text-sm text-muted-foreground">
                          Pay Date:{" "}
                          {new Date(stub.payDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-4 mb-2">
                        <div>
                          <p className="text-sm text-muted-foreground">Gross</p>
                          <p className="font-medium">
                            ${stub.grossPay.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Net</p>
                          <p className="font-medium">
                            ${stub.netPay.toLocaleString()}
                          </p>
                        </div>
                        <Badge
                          variant={
                            stub.status === "current" ? "secondary" : "outline"
                          }
                        >
                          {stub.status}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>
                                Pay Stub - {stub.period}
                              </DialogTitle>
                              <DialogDescription>
                                Detailed pay statement for the period
                              </DialogDescription>
                            </DialogHeader>
                            <PayStub {...samplePayStubData} />
                          </DialogContent>
                        </Dialog>
                        <Button variant="outline" size="sm">
                          <Download className="h-3 w-3 mr-1" />
                          PDF
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="benefits" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Benefits Enrollment</CardTitle>
              <CardDescription>
                Manage your benefit selections and view costs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {benefitsEnrollment.map((benefit) => (
                  <div
                    key={benefit.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-muted rounded">
                        {benefit.id === "health" && (
                          <Building className="h-5 w-5" />
                        )}
                        {benefit.id === "dental" && (
                          <Building className="h-5 w-5" />
                        )}
                        {benefit.id === "vision" && <Eye className="h-5 w-5" />}
                        {benefit.id === "401k" && (
                          <PiggyBank className="h-5 w-5" />
                        )}
                        {benefit.id === "life" && (
                          <CheckCircle className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{benefit.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {benefit.coverage}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-medium">
                          {benefit.enrolled
                            ? `$${benefit.cost}/month`
                            : "Available"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {benefit.enrolled ? "Current cost" : "Monthly cost"}
                        </p>
                      </div>
                      <Badge
                        variant={benefit.enrolled ? "default" : "secondary"}
                        className={
                          benefit.enrolled ? "bg-success text-white" : ""
                        }
                      >
                        {benefit.enrolled ? "Enrolled" : "Not Enrolled"}
                      </Badge>
                      <Button variant="outline" size="sm">
                        {benefit.enrolled ? "Modify" : "Enroll"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Benefits Summary</CardTitle>
                <CardDescription>Your total benefit costs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Monthly Premium</span>
                    <span className="font-medium">$602.38</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Annual Benefit Cost</span>
                    <span className="font-medium">$7,228.56</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t">
                    <span>Tax Savings (Est.)</span>
                    <span className="text-success">$2,168.57</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Open Enrollment</CardTitle>
                <CardDescription>
                  Next enrollment period information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <Calendar className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <h3 className="font-medium">2025 Open Enrollment</h3>
                    <p className="text-sm text-muted-foreground">
                      November 1-30, 2025
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    You can make changes to your benefit elections during the
                    open enrollment period.
                  </p>
                  <Button variant="outline" className="w-full">
                    Set Reminder
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="taxes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tax Documents</CardTitle>
              <CardDescription>
                Download your tax forms and documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {taxDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <FileText className="h-8 w-8 text-primary" />
                      <div>
                        <h3 className="font-medium">{doc.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Tax Year: {doc.year}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {doc.available ? (
                        <div className="flex items-center gap-2">
                          <Badge className="bg-success text-white">
                            Available
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">
                            Available{" "}
                            {new Date(doc.availableDate).toLocaleDateString()}
                          </Badge>
                          <Button variant="outline" size="sm" disabled>
                            Not Available
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tax Information</CardTitle>
              <CardDescription>
                Important tax-related information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-blue-50">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-blue-900">
                        W-2 Forms Available January 31st
                      </h3>
                      <p className="text-sm text-blue-700">
                        Your 2024 W-2 tax form will be available for download by
                        January 31, 2025.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 border rounded">
                    <p className="text-sm text-muted-foreground">
                      YTD Federal Tax
                    </p>
                    <p className="text-lg font-bold">$17,010</p>
                  </div>
                  <div className="p-3 border rounded">
                    <p className="text-sm text-muted-foreground">
                      YTD State Tax
                    </p>
                    <p className="text-lg font-bold">$4,250</p>
                  </div>
                  <div className="p-3 border rounded">
                    <p className="text-sm text-muted-foreground">
                      YTD Social Security
                    </p>
                    <p className="text-lg font-bold">$5,270</p>
                  </div>
                  <div className="p-3 border rounded">
                    <p className="text-sm text-muted-foreground">
                      YTD Medicare
                    </p>
                    <p className="text-lg font-bold">$1,233</p>
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
