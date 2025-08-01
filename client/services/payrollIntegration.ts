// Payroll Integration Service
// This service handles the integration between time tracking data and payroll processing

export interface TimeEntry {
  employeeId: string;
  date: string;
  clockIn: string;
  clockOut: string;
  regularHours: number;
  overtimeHours: number;
  breakTime: number;
  projectId?: string;
  billable: boolean;
  approved: boolean;
}

export interface Employee {
  id: string;
  name: string;
  payType: "hourly" | "salary";
  payRate: number;
  overtimeRate?: number;
  department: string;
  taxWithholdings: {
    federal: number;
    state: number;
    socialSecurity: number;
    medicare: number;
  };
  benefits: {
    healthInsurance: number;
    dentalInsurance: number;
    retirement401k: number;
    lifeInsurance: number;
  };
  exemptions: number;
  filingStatus: "single" | "married" | "head_of_household";
}

export interface PayrollPeriod {
  id: string;
  startDate: string;
  endDate: string;
  payDate: string;
  status: "draft" | "processing" | "completed" | "cancelled";
}

export interface PayrollCalculation {
  employeeId: string;
  periodId: string;
  regularHours: number;
  overtimeHours: number;
  holidayHours: number;
  sickHours: number;
  vacationHours: number;
  regularPay: number;
  overtimePay: number;
  holidayPay: number;
  grossPay: number;
  federalTax: number;
  stateTax: number;
  socialSecurityTax: number;
  medicareTax: number;
  benefitDeductions: number;
  totalDeductions: number;
  netPay: number;
  ytdGrossPay: number;
  ytdNetPay: number;
  ytdTaxes: number;
}

export class PayrollIntegrationService {
  /**
   * Calculate payroll for a specific employee and pay period
   */
  static calculateEmployeePayroll(
    employee: Employee,
    timeEntries: TimeEntry[],
    period: PayrollPeriod,
  ): PayrollCalculation {
    // Calculate total hours
    const regularHours = timeEntries.reduce(
      (total, entry) => total + entry.regularHours,
      0,
    );
    const overtimeHours = timeEntries.reduce(
      (total, entry) => total + entry.overtimeHours,
      0,
    );

    // Calculate gross pay
    let regularPay = 0;
    let overtimePay = 0;

    if (employee.payType === "hourly") {
      regularPay = regularHours * employee.payRate;
      overtimePay =
        overtimeHours * (employee.overtimeRate || employee.payRate * 1.5);
    } else {
      // Salary calculation (bi-weekly)
      const annualSalary = employee.payRate;
      const biweeklyPay = annualSalary / 26; // 26 pay periods per year
      regularPay = biweeklyPay;

      // Overtime for salary employees (if applicable)
      if (overtimeHours > 0) {
        const hourlyEquivalent = annualSalary / (52 * 40); // 40 hours per week
        overtimePay = overtimeHours * hourlyEquivalent * 1.5;
      }
    }

    const grossPay = regularPay + overtimePay;

    // Calculate tax deductions
    const federalTax = this.calculateFederalTax(grossPay, employee);
    const stateTax = this.calculateStateTax(grossPay, employee);
    const socialSecurityTax = grossPay * 0.062; // 6.2%
    const medicareTax = grossPay * 0.0145; // 1.45%

    // Calculate benefit deductions
    const benefitDeductions = Object.values(employee.benefits).reduce(
      (sum, amount) => sum + amount,
      0,
    );

    // Calculate totals
    const totalTaxes = federalTax + stateTax + socialSecurityTax + medicareTax;
    const totalDeductions = totalTaxes + benefitDeductions;
    const netPay = grossPay - totalDeductions;

    return {
      employeeId: employee.id,
      periodId: period.id,
      regularHours,
      overtimeHours,
      holidayHours: 0, // Calculate from time entries if needed
      sickHours: 0, // Calculate from leave records
      vacationHours: 0, // Calculate from leave records
      regularPay,
      overtimePay,
      holidayPay: 0,
      grossPay,
      federalTax,
      stateTax,
      socialSecurityTax,
      medicareTax,
      benefitDeductions,
      totalDeductions,
      netPay,
      ytdGrossPay: 0, // Would be calculated from previous periods
      ytdNetPay: 0, // Would be calculated from previous periods
      ytdTaxes: 0, // Would be calculated from previous periods
    };
  }

  /**
   * Calculate federal tax withholding
   */
  private static calculateFederalTax(
    grossPay: number,
    employee: Employee,
  ): number {
    // Simplified federal tax calculation
    // In production, this would use IRS Publication 15 tax tables
    const annualizedPay = grossPay * 26; // Bi-weekly to annual
    let taxRate = 0;

    if (employee.filingStatus === "single") {
      if (annualizedPay <= 10275) taxRate = 0.1;
      else if (annualizedPay <= 41775) taxRate = 0.12;
      else if (annualizedPay <= 89450) taxRate = 0.22;
      else taxRate = 0.24;
    } else if (employee.filingStatus === "married") {
      if (annualizedPay <= 20550) taxRate = 0.1;
      else if (annualizedPay <= 83550) taxRate = 0.12;
      else if (annualizedPay <= 178850) taxRate = 0.22;
      else taxRate = 0.24;
    }

    const federalTax = grossPay * taxRate - (employee.exemptions * 4300) / 26;
    return Math.max(0, federalTax);
  }

  /**
   * Calculate state tax withholding
   */
  private static calculateStateTax(
    grossPay: number,
    employee: Employee,
  ): number {
    // Simplified state tax calculation (varies by state)
    // This example uses a flat 5% rate
    return grossPay * 0.05;
  }

  /**
   * Validate time entries before payroll processing
   */
  static validateTimeEntries(timeEntries: TimeEntry[]): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    timeEntries.forEach((entry, index) => {
      // Check if time entry is approved
      if (!entry.approved) {
        errors.push(`Time entry ${index + 1} is not approved`);
      }

      // Check for reasonable hours
      const totalHours = entry.regularHours + entry.overtimeHours;
      if (totalHours > 24) {
        errors.push(`Time entry ${index + 1} exceeds 24 hours in a day`);
      }

      // Check clock in/out consistency
      if (entry.clockIn && entry.clockOut) {
        const clockInTime = new Date(`${entry.date} ${entry.clockIn}`);
        const clockOutTime = new Date(`${entry.date} ${entry.clockOut}`);

        if (clockOutTime <= clockInTime) {
          errors.push(`Time entry ${index + 1} has invalid clock out time`);
        }
      }
    });

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Generate payroll summary for a pay period
   */
  static generatePayrollSummary(
    employees: Employee[],
    calculations: PayrollCalculation[],
  ): {
    totalEmployees: number;
    totalGrossPay: number;
    totalNetPay: number;
    totalTaxes: number;
    totalBenefits: number;
    averagePayPerEmployee: number;
  } {
    const totalEmployees = employees.length;
    const totalGrossPay = calculations.reduce(
      (sum, calc) => sum + calc.grossPay,
      0,
    );
    const totalNetPay = calculations.reduce(
      (sum, calc) => sum + calc.netPay,
      0,
    );
    const totalTaxes = calculations.reduce(
      (sum, calc) =>
        sum +
        calc.federalTax +
        calc.stateTax +
        calc.socialSecurityTax +
        calc.medicareTax,
      0,
    );
    const totalBenefits = calculations.reduce(
      (sum, calc) => sum + calc.benefitDeductions,
      0,
    );
    const averagePayPerEmployee =
      totalEmployees > 0 ? totalNetPay / totalEmployees : 0;

    return {
      totalEmployees,
      totalGrossPay,
      totalNetPay,
      totalTaxes,
      totalBenefits,
      averagePayPerEmployee,
    };
  }

  /**
   * Check for compliance violations
   */
  static checkCompliance(
    employee: Employee,
    timeEntries: TimeEntry[],
    calculation: PayrollCalculation,
  ): { compliant: boolean; violations: string[] } {
    const violations: string[] = [];

    // Check minimum wage compliance
    const totalHours = calculation.regularHours + calculation.overtimeHours;
    const effectiveHourlyRate =
      totalHours > 0 ? calculation.grossPay / totalHours : 0;
    const minimumWage = 15.0; // Example minimum wage

    if (effectiveHourlyRate < minimumWage) {
      violations.push(
        `Pay rate below minimum wage: $${effectiveHourlyRate.toFixed(2)}`,
      );
    }

    // Check overtime compliance (>40 hours per week)
    const weeklyHours = totalHours; // Assuming bi-weekly period
    if (weeklyHours > 80 && calculation.overtimeHours === 0) {
      violations.push(`Missing overtime pay for ${weeklyHours} hours worked`);
    }

    // Check maximum hours compliance (varies by jurisdiction)
    if (weeklyHours > 100) {
      violations.push(`Excessive hours worked: ${weeklyHours} hours`);
    }

    return {
      compliant: violations.length === 0,
      violations,
    };
  }

  /**
   * Export payroll data for external systems
   */
  static exportPayrollData(
    calculations: PayrollCalculation[],
    format: "csv" | "json" | "xml",
  ): string {
    switch (format) {
      case "csv":
        return this.exportToCSV(calculations);
      case "json":
        return JSON.stringify(calculations, null, 2);
      case "xml":
        return this.exportToXML(calculations);
      default:
        throw new Error(`Unsupported export format: ${format}`);
    }
  }

  private static exportToCSV(calculations: PayrollCalculation[]): string {
    const headers = [
      "Employee ID",
      "Period ID",
      "Regular Hours",
      "Overtime Hours",
      "Regular Pay",
      "Overtime Pay",
      "Gross Pay",
      "Federal Tax",
      "State Tax",
      "Social Security",
      "Medicare",
      "Benefits",
      "Total Deductions",
      "Net Pay",
    ];

    const rows = calculations.map((calc) => [
      calc.employeeId,
      calc.periodId,
      calc.regularHours,
      calc.overtimeHours,
      calc.regularPay.toFixed(2),
      calc.overtimePay.toFixed(2),
      calc.grossPay.toFixed(2),
      calc.federalTax.toFixed(2),
      calc.stateTax.toFixed(2),
      calc.socialSecurityTax.toFixed(2),
      calc.medicareTax.toFixed(2),
      calc.benefitDeductions.toFixed(2),
      calc.totalDeductions.toFixed(2),
      calc.netPay.toFixed(2),
    ]);

    return [headers, ...rows].map((row) => row.join(",")).join("\n");
  }

  private static exportToXML(calculations: PayrollCalculation[]): string {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<payroll>\n';

    calculations.forEach((calc) => {
      xml += "  <employee>\n";
      xml += `    <id>${calc.employeeId}</id>\n`;
      xml += `    <period>${calc.periodId}</period>\n`;
      xml += `    <grossPay>${calc.grossPay.toFixed(2)}</grossPay>\n`;
      xml += `    <netPay>${calc.netPay.toFixed(2)}</netPay>\n`;
      xml += `    <deductions>${calc.totalDeductions.toFixed(2)}</deductions>\n`;
      xml += "  </employee>\n";
    });

    xml += "</payroll>";
    return xml;
  }
}

/**
 * Mock data for testing and demonstration
 */
export const mockData = {
  employees: [
    {
      id: "EMP001",
      name: "John Doe",
      payType: "salary" as const,
      payRate: 85000,
      department: "Engineering",
      taxWithholdings: {
        federal: 0.22,
        state: 0.05,
        socialSecurity: 0.062,
        medicare: 0.0145,
      },
      benefits: {
        healthInsurance: 350,
        dentalInsurance: 45,
        retirement401k: 195.38,
        lifeInsurance: 12,
      },
      exemptions: 2,
      filingStatus: "married" as const,
    },
  ],

  timeEntries: [
    {
      employeeId: "EMP001",
      date: "2024-12-16",
      clockIn: "09:00",
      clockOut: "17:30",
      regularHours: 8,
      overtimeHours: 0.5,
      breakTime: 1,
      billable: true,
      approved: true,
    },
  ],

  payPeriod: {
    id: "PP2024-26",
    startDate: "2024-12-16",
    endDate: "2024-12-31",
    payDate: "2024-12-31",
    status: "processing" as const,
  },
};
