import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationPickerSmartWidgetComponent } from './location-picker-smart-widget.component';

describe('LocationPickerSmartWidgetComponent', () => {
  let component: LocationPickerSmartWidgetComponent;
  let fixture: ComponentFixture<LocationPickerSmartWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationPickerSmartWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationPickerSmartWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
