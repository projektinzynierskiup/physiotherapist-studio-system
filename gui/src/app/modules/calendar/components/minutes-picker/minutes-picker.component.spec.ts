import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinutesPickerComponent } from './minutes-picker.component';

describe('MinutesPickerComponent', () => {
  let component: MinutesPickerComponent;
  let fixture: ComponentFixture<MinutesPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinutesPickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinutesPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
