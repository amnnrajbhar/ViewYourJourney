import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-day-calculator',
  templateUrl: './day-calculator.component.html',
  styleUrls: ['./day-calculator.component.css']
})
export class DayCalculatorComponent implements OnInit {
  calculatorForm: FormGroup;
  rangeForm: FormGroup;
  result: any = null;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private fb: FormBuilder) {
    // Configure datepicker
    this.bsConfig = {
      containerClass: 'theme-blue',
      showWeekNumbers: false,
      dateInputFormat: 'MM/DD/YYYY'
    };
  }

  ngOnInit() {
    // Initialize both forms
    this.calculatorForm = this.fb.group({
      birthDate: ['', Validators.required],
      birthTime: [new Date(), Validators.required]
    });

    this.rangeForm = this.fb.group({
      fromDate: ['', Validators.required],
      fromTime: [new Date(), Validators.required],
      toDate: ['', Validators.required],
      toTime: [new Date(), Validators.required]
    });

    // Subscribe to form changes to auto-calculate
    this.calculatorForm.valueChanges.subscribe(() => {
      this.calculateDaysOnEarth();
    });

    this.rangeForm.valueChanges.subscribe(() => {
      this.calculateDateRange();
    });
  }

  calculateDaysOnEarth() {
    const formValue = this.calculatorForm.value;
    if (formValue.birthDate && formValue.birthTime) {
      const birthDateTime = this.combineDateAndTime(formValue.birthDate, formValue.birthTime);
      const now = moment();
      const birthMoment = moment(birthDateTime);

      if (birthMoment.isValid()) {
        const duration = moment.duration(now.diff(birthMoment));

        this.result = {
          daysOnEarth: Math.floor(duration.asDays()),
          yearsOnEarth: duration.years(),
          hoursOnEarth: Math.floor(duration.asHours()),
          minutesOnEarth: Math.floor(duration.asMinutes())
        };
      }
    }
  }

  calculateDateRange() {
    debugger;
    const formValue = this.rangeForm.value;
    if (formValue.fromDate && formValue.fromTime && formValue.toDate && formValue.toTime) {
      const fromDateTime = this.combineDateAndTime(formValue.fromDate, formValue.fromTime);
      const toDateTime = this.combineDateAndTime(formValue.toDate, formValue.toTime);

      const fromMoment = moment(fromDateTime);
      const toMoment = moment(toDateTime);

      if (fromMoment.isValid() && toMoment.isValid()) {
        const duration = moment.duration(toMoment.diff(fromMoment));

        if (!this.result) this.result = {};
        this.result.dateRange = {
          days: Math.floor(duration.asDays()),
          hours: Math.floor(duration.asHours()),
          minutes: Math.floor(duration.asMinutes()),
          years: Math.floor(duration.asYears()),
          total:duration.years()+" Years and "+duration.months() +" Months",
          months: Math.floor(duration.asMonths()),
          weeks: Math.floor(duration.asWeeks()),
        };
      }
    }
  }

  private combineDateAndTime(date: Date, time: Date): Date {
    const combined = new Date(date);
    combined.setHours(time.getHours(), time.getMinutes(), time.getSeconds());
    return combined;
  }

  getMotivationalMessage(): string {
    if (!this.result) return '';

    const days = this.result.daysOnEarth;
    if (days < 365) return 'Your journey has just begun!';
    if (days < 365 * 5) return 'The adventure continues!';
    if (days < 365 * 18) return 'Growing and learning every day!';
    if (days < 365 * 30) return 'Making memories and building dreams!';
    if (days < 365 * 50) return 'Wisdom and experience guide your way!';
    return 'A lifetime of incredible experiences!';
  }

  resetCalculations() {
    this.calculatorForm.reset();
    this.rangeForm.reset();
    this.result = null;
  }
}