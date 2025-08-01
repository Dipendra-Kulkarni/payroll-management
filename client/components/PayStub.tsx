import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Download, FileText, Building } from 'lucide-react';

interface PayStubProps {
  employee: {
    name: string;
    id: string;
    department: string;
    position: string;
    address?: string;
  };
  payPeriod: {
    start: string;
    end: string;
    payDate: string;
  };
  earnings: {
    regularHours: number;
    regularRate: number;
    regularPay: number;
    overtimeHours: number;
    overtimeRate: number;
    overtimePay: number;
    bonuses?: number;
    commissions?: number;
    grossPay: number;
  };
  deductions: {
    federalTax: number;
    stateTax: number;
    socialSecurity: number;
    medicare: number;
    healthInsurance: number;
    dentalInsurance: number;
    retirement401k: number;
    totalDeductions: number;
  };
  netPay: number;
  ytdTotals: {
    grossPay: number;
    totalDeductions: number;
    netPay: number;
  };
}

export function PayStub({ 
  employee, 
  payPeriod, 
  earnings, 
  deductions, 
  netPay, 
  ytdTotals 
}: PayStubProps) {
  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    console.log('Downloading pay stub...');
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader className="bg-primary/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Building className="h-6 w-6 text-primary" />
            <div>
              <CardTitle className="text-xl">TimeTracker Pro</CardTitle>
              <CardDescription>Employee Pay Statement</CardDescription>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Print
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-8 space-y-6">
        {/* Employee Information */}
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold mb-3">Employee Information</h3>
            <div className="space-y-1 text-sm">
              <p><span className="font-medium">Name:</span> {employee.name}</p>
              <p><span className="font-medium">Employee ID:</span> {employee.id}</p>
              <p><span className="font-medium">Department:</span> {employee.department}</p>
              <p><span className="font-medium">Position:</span> {employee.position}</p>
              {employee.address && (
                <p><span className="font-medium">Address:</span> {employee.address}</p>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Pay Period Information</h3>
            <div className="space-y-1 text-sm">
              <p><span className="font-medium">Pay Period:</span> {payPeriod.start} - {payPeriod.end}</p>
              <p><span className="font-medium">Pay Date:</span> {new Date(payPeriod.payDate).toLocaleDateString()}</p>
              <p><span className="font-medium">Pay Method:</span> Direct Deposit</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Earnings Section */}
        <div>
          <h3 className="font-semibold mb-4">Earnings</h3>
          <div className="space-y-3">
            <div className="grid grid-cols-4 gap-4 text-sm font-medium text-muted-foreground border-b pb-2">
              <div>Description</div>
              <div className="text-right">Hours</div>
              <div className="text-right">Rate</div>
              <div className="text-right">Amount</div>
            </div>

            <div className="grid grid-cols-4 gap-4 text-sm">
              <div>Regular Pay</div>
              <div className="text-right">{earnings.regularHours}</div>
              <div className="text-right">${earnings.regularRate.toFixed(2)}</div>
              <div className="text-right">${earnings.regularPay.toFixed(2)}</div>
            </div>

            {earnings.overtimeHours > 0 && (
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div>Overtime Pay</div>
                <div className="text-right">{earnings.overtimeHours}</div>
                <div className="text-right">${earnings.overtimeRate.toFixed(2)}</div>
                <div className="text-right">${earnings.overtimePay.toFixed(2)}</div>
              </div>
            )}

            {earnings.bonuses && earnings.bonuses > 0 && (
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div>Bonus</div>
                <div className="text-right">-</div>
                <div className="text-right">-</div>
                <div className="text-right">${earnings.bonuses.toFixed(2)}</div>
              </div>
            )}

            {earnings.commissions && earnings.commissions > 0 && (
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div>Commission</div>
                <div className="text-right">-</div>
                <div className="text-right">-</div>
                <div className="text-right">${earnings.commissions.toFixed(2)}</div>
              </div>
            )}

            <div className="grid grid-cols-4 gap-4 text-sm font-medium border-t pt-2">
              <div>Total Gross Pay</div>
              <div></div>
              <div></div>
              <div className="text-right">${earnings.grossPay.toFixed(2)}</div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Deductions Section */}
        <div>
          <h3 className="font-semibold mb-4">Deductions</h3>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium mb-3 text-muted-foreground">Tax Deductions</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Federal Income Tax</span>
                    <span>${deductions.federalTax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>State Income Tax</span>
                    <span>${deductions.stateTax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Social Security</span>
                    <span>${deductions.socialSecurity.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Medicare</span>
                    <span>${deductions.medicare.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3 text-muted-foreground">Benefit Deductions</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Health Insurance</span>
                    <span>${deductions.healthInsurance.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dental Insurance</span>
                    <span>${deductions.dentalInsurance.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>401(k) Contribution</span>
                    <span>${deductions.retirement401k.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between font-medium border-t pt-3">
              <span>Total Deductions</span>
              <span>${deductions.totalDeductions.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Net Pay */}
        <div className="bg-primary/5 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Net Pay</h3>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">${netPay.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">This Period</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Year-to-Date Totals */}
        <div>
          <h3 className="font-semibold mb-4">Year-to-Date Totals</h3>
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground">YTD Gross Pay</p>
              <p className="text-xl font-bold">${ytdTotals.grossPay.toLocaleString()}</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground">YTD Deductions</p>
              <p className="text-xl font-bold">${ytdTotals.totalDeductions.toLocaleString()}</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground">YTD Net Pay</p>
              <p className="text-xl font-bold">${ytdTotals.netPay.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-6 border-t text-center text-xs text-muted-foreground">
          <p>This is an official pay statement. Please retain for your records.</p>
          <p>Questions about your pay? Contact HR at hr@company.com or (555) 123-4567</p>
        </div>
      </CardContent>
    </Card>
  );
}
