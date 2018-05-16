import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuiLocationPickerComponent } from './aui-location-picker.component';

describe('AuiLocationPickerComponent', () => {
  let component: AuiLocationPickerComponent;
  let fixture: ComponentFixture<AuiLocationPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuiLocationPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuiLocationPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
