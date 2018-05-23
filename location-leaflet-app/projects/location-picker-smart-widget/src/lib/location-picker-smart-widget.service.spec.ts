import { TestBed, inject } from '@angular/core/testing';

import { LocationPickerSmartWidgetService } from './location-picker-smart-widget.service';

describe('LocationPickerSmartWidgetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocationPickerSmartWidgetService]
    });
  });

  it('should be created', inject([LocationPickerSmartWidgetService], (service: LocationPickerSmartWidgetService) => {
    expect(service).toBeTruthy();
  }));
});
