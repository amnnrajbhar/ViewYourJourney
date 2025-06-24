import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayCalculatorComponent } from './day-calculator.component';

describe('DayCalculatorComponent', () => {
  let component: DayCalculatorComponent;
  let fixture: ComponentFixture<DayCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayCalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
