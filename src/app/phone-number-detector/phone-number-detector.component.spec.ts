import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneNumberDetectorComponent } from './phone-number-detector.component';

describe('PhoneNumberDetectorComponent', () => {
  let component: PhoneNumberDetectorComponent;
  let fixture: ComponentFixture<PhoneNumberDetectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhoneNumberDetectorComponent]
    });
    fixture = TestBed.createComponent(PhoneNumberDetectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
