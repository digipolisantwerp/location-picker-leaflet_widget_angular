import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationPickerLeafletComponent } from './location-picker-leaflet.component';

describe('LocationPickerLeafletComponent', () => {
  let component: LocationPickerLeafletComponent;
  let fixture: ComponentFixture<LocationPickerLeafletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationPickerLeafletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationPickerLeafletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
