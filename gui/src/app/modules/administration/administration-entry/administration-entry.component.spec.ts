import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationEntryComponent } from './administration-entry.component';

describe('AdministrationEntryComponent', () => {
  let component: AdministrationEntryComponent;
  let fixture: ComponentFixture<AdministrationEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrationEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministrationEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
