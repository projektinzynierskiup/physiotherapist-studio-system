import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsEntryComponent } from './analytics-entry.component';

describe('AnalyticsEntryComponent', () => {
  let component: AnalyticsEntryComponent;
  let fixture: ComponentFixture<AnalyticsEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalyticsEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyticsEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
