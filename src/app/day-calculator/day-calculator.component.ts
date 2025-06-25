// @Component({
//   selector: 'app-day-calculator',
//   templateUrl: './day-calculator.component.html',
//   styleUrls: ['./day-calculator.component.css']
// })
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-day-calculator',
  templateUrl: './day-calculator.component.html',
  styleUrls: ['./day-calculator.component.css']
})
export class DayCalculatorComponent implements OnInit {
  calculatorForm: FormGroup;
  rangeForm: FormGroup;
  result: any = null;
  showChart = false;
  showRangeChart = false;
  
  // Date picker configuration
  bsConfig = {
    dateInputFormat: 'MM/DD/YYYY',
    containerClass: 'theme-default'
  };

  // Years Bar Chart Data
  yearsBarChartLabels: string[] = [];
  yearsBarChartDatasets: any[] = [];
  yearsBarChartOptions: any = {};
  yearsBarChartColors: any[] = [];

  // Main Bar Chart Data
  barChartLabels: string[] = ['Years', 'Days', 'Hours', 'Minutes'];
  barChartData: number[] = [];
  barChartOptions: any = {};
  barChartColors: any[] = [];

  // Pie Chart Data
  pieChartLabels: string[] = ['Years', 'Days', 'Hours', 'Minutes'];
  pieChartData: number[] = [];
  pieChartOptions: any = {};
  pieChartColors: any[] = [];

  // Doughnut Chart Data
  doughnutChartLabels: string[] = ['Childhood (0-12)', 'Teenage (13-19)', 'Adult (20+)'];
  doughnutChartData: number[] = [];
  doughnutChartOptions: any = {};
  doughnutChartColors: any[] = [];

  // Line Chart Data for Range
  lineChartLabels: string[] = ['Years', 'Months', 'Weeks', 'Days', 'Hours', 'Minutes'];
  lineChartDatasets: any[] = [];
  lineChartOptions: any = {};
  lineChartColors: any[] = [];

  // Radar Chart Data for Range
  radarChartLabels: string[] = ['Years', 'Months', 'Weeks', 'Days', 'Hours', 'Minutes'];
  radarChartDatasets: any[] = [];
  radarChartOptions: any = {};
  radarChartColors: any[] = [];

  constructor(private fb: FormBuilder) {
    this.calculatorForm = this.fb.group({
      birthDate: [''],
      birthTime: [new Date()]
    });

    this.rangeForm = this.fb.group({
      fromDate: [''],
      fromTime: [new Date()],
      toDate: [''],
      toTime: [new Date()]
    });
  }

  ngOnInit(): void {
    this.setupChartOptions();
    this.setupFormListeners();
  }

  private setupChartOptions(): void {
    // Common responsive options to prevent chart expansion
    const baseOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            display: true
          }
        },
        x: {
          grid: {
            display: true
          }
        }
      }
    };

    // Years Bar Chart Options
    this.yearsBarChartOptions = {
      ...baseOptions,
      plugins: {
        ...baseOptions.plugins,
        title: {
          display: true,
          text: 'Years Lived Breakdown'
        }
      }
    };

    // Main Bar Chart Options
    this.barChartOptions = {
      ...baseOptions,
      plugins: {
        ...baseOptions.plugins,
        title: {
          display: true,
          text: 'Life Statistics Overview'
        }
      }
    };

    // Pie Chart Options
    this.pieChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'right'
        },
        title: {
          display: true,
          text: 'Time Distribution'
        }
      }
    };

    // Doughnut Chart Options
    this.doughnutChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'bottom'
        },
        title: {
          display: true,
          text: 'Life Phases'
        }
      }
    };

    // Line Chart Options
    this.lineChartOptions = {
      ...baseOptions,
      plugins: {
        ...baseOptions.plugins,
        title: {
          display: true,
          text: 'Range Statistics Timeline'
        }
      }
    };

    // Radar Chart Options
    this.radarChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top'
        },
        title: {
          display: true,
          text: 'Multi-dimensional Range View'
        }
      },
      scales: {
        r: {
          beginAtZero: true,
          grid: {
            display: true
          }
        }
      }
    };

    // Chart Colors
    this.yearsBarChartColors = [{
      backgroundColor: ['#007bff', '#28a745', '#ffc107', '#dc3545', '#6f42c1', '#fd7e14'],
      borderColor: ['#0056b3', '#1e7e34', '#e0a800', '#c82333', '#59359a', '#e8590c'],
      borderWidth: 2
    }];

    this.barChartColors = [{
      backgroundColor: ['#007bff', '#28a745', '#ffc107', '#17a2b8'],
      borderColor: ['#0056b3', '#1e7e34', '#e0a800', '#138496'],
      borderWidth: 2
    }];

    this.pieChartColors = [{
      backgroundColor: ['#007bff', '#28a745', '#ffc107', '#17a2b8'],
      borderColor: ['#fff', '#fff', '#fff', '#fff'],
      borderWidth: 2
    }];

    this.doughnutChartColors = [{
      backgroundColor: ['#ff9999', '#66b3ff', '#99ff99'],
      borderColor: ['#fff', '#fff', '#fff'],
      borderWidth: 2
    }];

    this.lineChartColors = [{
      backgroundColor: 'rgba(23, 162, 184, 0.2)',
      borderColor: '#17a2b8',
      borderWidth: 3,
      fill: true
    }];

    this.radarChartColors = [{
      backgroundColor: 'rgba(23, 162, 184, 0.2)',
      borderColor: '#17a2b8',
      borderWidth: 2,
      pointBackgroundColor: '#17a2b8',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#17a2b8'
    }];
  }

  private setupFormListeners(): void {
    // Listen to birth date and time changes
    this.calculatorForm.valueChanges.subscribe(values => {
      if (values.birthDate) {
        this.calculateLifeStats();
      }
    });

    // Listen to date range changes
    this.rangeForm.valueChanges.subscribe(values => {
      if (values.fromDate && values.toDate) {
        this.calculateDateRange();
      }
    });
  }

  private calculateLifeStats(): void {
    const birthDate = this.calculatorForm.get('birthDate').value;
    const birthTime = this.calculatorForm.get('birthTime').value;
    
    if (!birthDate) return;

    const birth = new Date(birthDate);
    if (birthTime) {
      birth.setHours(birthTime.getHours(), birthTime.getMinutes());
    }

    const now = new Date();
    const diffTime = Math.abs(now.getTime() - birth.getTime());
    
    const daysOnEarth = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const yearsOnEarth = Math.floor(daysOnEarth / 365.25);
    const hoursOnEarth = Math.floor(diffTime / (1000 * 60 * 60));
    const minutesOnEarth = Math.floor(diffTime / (1000 * 60));

    this.result = {
      daysOnEarth,
      yearsOnEarth,
      hoursOnEarth,
      minutesOnEarth
    };

    this.updateChartData();
  }

  private calculateDateRange(): void {
    const fromDate = this.rangeForm.get('fromDate').value;
    const toDate = this.rangeForm.get('toDate').value;
    const fromTime = this.rangeForm.get('fromTime').value;
    const toTime = this.rangeForm.get('toTime').value;

    if (!fromDate || !toDate) return;

    const start = new Date(fromDate);
    const end = new Date(toDate);
    
    if (fromTime) {
      start.setHours(fromTime.getHours(), fromTime.getMinutes());
    }
    if (toTime) {
      end.setHours(toTime.getHours(), toTime.getMinutes());
    }

    const diffTime = Math.abs(end.getTime() - start.getTime());
    
    const years = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365.25));
    const months = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30.44));
    const weeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diffTime / (1000 * 60 * 60));
    const minutes = Math.floor(diffTime / (1000 * 60));

    if (!this.result) this.result = {};
    
    this.result.dateRange = {
      total: `${years}y ${months % 12}m ${days % 30}d`,
      years,
      months,
      weeks,
      days,
      hours,
      minutes
    };

    this.updateRangeChartData();
  }

  private updateChartData(): void {
    if (!this.result) return;

    // Update Years Bar Chart - showing year by year breakdown
    this.yearsBarChartLabels = [];
    const yearsData = [];
    const currentYear = new Date().getFullYear();
    const birthYear = currentYear - this.result.yearsOnEarth;
    
    // Show last 10 years or all years if less than 10
    const yearsToShow = Math.min(10, this.result.yearsOnEarth + 1);
    for (let i = 0; i < yearsToShow; i++) {
      const year = currentYear - i;
      this.yearsBarChartLabels.unshift(year.toString());
      yearsData.unshift(1); // Each year represents 1 year lived
    }

    this.yearsBarChartDatasets = [{
      data: yearsData,
      label: 'Years Lived',
      backgroundColor: '#007bff',
      borderColor: '#0056b3',
      borderWidth: 1
    }];

    // Update main bar chart
    this.barChartData = [
      this.result.yearsOnEarth,
      this.result.daysOnEarth,
      Math.floor(this.result.hoursOnEarth / 1000), // Scale down for better visualization
      Math.floor(this.result.minutesOnEarth / 10000) // Scale down for better visualization
    ];

    // Update pie chart
    this.pieChartData = [
      this.result.yearsOnEarth,
      Math.floor(this.result.daysOnEarth / 100), // Scale down
      Math.floor(this.result.hoursOnEarth / 10000), // Scale down
      Math.floor(this.result.minutesOnEarth / 100000) // Scale down
    ];

    // Update doughnut chart (life phases)
    const childhood = Math.min(12, this.result.yearsOnEarth);
    const teenage = Math.min(7, Math.max(0, this.result.yearsOnEarth - 12));
    const adult = Math.max(0, this.result.yearsOnEarth - 19);
    
    this.doughnutChartData = [childhood, teenage, adult];
  }

  private updateRangeChartData(): void {
    if (!this.result.dateRange) return;

    // Update line chart
    const rangeData = [
      this.result.dateRange.years,
      this.result.dateRange.months,
      this.result.dateRange.weeks,
      Math.floor(this.result.dateRange.days / 10), // Scale down
      Math.floor(this.result.dateRange.hours / 100), // Scale down
      Math.floor(this.result.dateRange.minutes / 1000) // Scale down
    ];

    this.lineChartDatasets = [{
      data: rangeData,
      label: 'Range Stats',
      backgroundColor: 'rgba(23, 162, 184, 0.2)',
      borderColor: '#17a2b8',
      borderWidth: 3,
      fill: true
    }];

    // Update radar chart
    this.radarChartDatasets = [{
      data: rangeData,
      label: 'Range View',
      backgroundColor: 'rgba(23, 162, 184, 0.2)',
      borderColor: '#17a2b8',
      borderWidth: 2,
      pointBackgroundColor: '#17a2b8',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#17a2b8'
    }];
  }

  toggleChart(): void {
    this.showChart = !this.showChart;
  }

  toggleRangeChart(): void {
    this.showRangeChart = !this.showRangeChart;
  }

  getMotivationalMessage(): string {
    if (!this.result) return '';
    
    const years = this.result.yearsOnEarth;
    if (years < 18) return "You're in the beautiful phase of growing and learning!";
    if (years < 30) return "You're in your prime years of exploration and discovery!";
    if (years < 50) return "You're in the golden years of experience and wisdom!";
    return "You've accumulated incredible life experience and wisdom!";
  }

  resetCalculations(): void {
    this.calculatorForm.reset();
    this.rangeForm.reset();
    this.result = null;
    this.showChart = false;
    this.showRangeChart = false;
  }
}