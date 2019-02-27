import { SimpleChange } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationPickerLeafletComponent } from './location-picker-leaflet.component';
import { LeafletModule } from '@acpaas-ui/ngx-components/map';
import { LocationPickerModule } from '@acpaas-ui-widgets/ngx-location-picker';
import { LocationPickerLeafletService } from './location-picker-leaflet.service';
import { LocationItem, LocationType } from './LocationItem.domain';
import {
  of,
} from 'rxjs';

describe('LocationPickerLeafletComponent', () => {
  const dummyCoordinates = { lat: 51.21025180508141, lng: 4.474143732169805 };
  const dummyLocation: LocationItem = {
    id: 'P_DA/Locaties/MapServer/18/1168460',
    name: 'Burgemeester De Boeylaan (Deurne)',
    layer: 'straatnaam',
    locationType: LocationType.Street,
    coordinates: {
      latLng: dummyCoordinates
    },
    street: 'Burgemeester De Boeylaan'
  };
  const emptyDummyLocation: LocationItem = {
    id: 'P_DA/Locaties/MapServer/18/1168460',
    name: 'Burgemeester De Boeylaan (Deurne)',
    layer: 'straatnaam',
    locationType: LocationType.Street,
    street: 'Burgemeester De Boeylaan'
  };
  const dummyPolygonLocation: LocationItem = {
    id: 'P_DA/Locaties/MapServer/18/1168460',
    name: 'Burgemeester De Boeylaan (Deurne)',
    locationType: LocationType.Street,
    polygons: [
      [dummyCoordinates, dummyCoordinates, dummyCoordinates],
      [dummyCoordinates, dummyCoordinates, dummyCoordinates, dummyCoordinates],
    ]
  };

  class MockService {
    public getLocation(url: string, query: any): Promise<any> {
      return of(dummyLocation).toPromise();
    }
    public validCoordinates(coordinates): boolean {
      return true;
    }
  }

  let component: LocationPickerLeafletComponent;
  let element: any;
  let fixture: ComponentFixture<LocationPickerLeafletComponent>;
  let service: LocationPickerLeafletService;
  let serviceSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LocationPickerLeafletComponent],
      providers: [
        LocationPickerLeafletService,
        {
          provide: LocationPickerLeafletService,
          useClass: MockService,
        },
      ],
      imports: [LeafletModule, LocationPickerModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationPickerLeafletComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    component.locationUrl = null;
    component.location = null;
    component.url = 'https://localhost';
    service = TestBed.get(LocationPickerLeafletService);
  });
  afterEach(() => {
    if (element) {
      document.body.removeChild(element);
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be truthy when ngInit is called.', () => {
    component.locationUrl = 'https://some/url';
    component.ngOnInit();
    expect(component).toBeTruthy();
  });
  it('should throw error when url is null.', () => {
    component.url = null;
    expect(() => {
      component.ngOnInit();
      throw new Error();
    }).toThrow();
  });

  it('should emit when emit is called', () => {
    spyOn(component.locationChange, 'emit');
    component.emitValue(dummyLocation);
    expect(component.locationChange.emit).toHaveBeenCalled();
  });

  it('should emit when locationpicker value changed', () => {
    component.ngOnInit();
    spyOn(component.locationChange, 'emit');
    component.locationPickerValueChanged(dummyLocation);
    expect(component.locationChange.emit).toHaveBeenCalled();
  });

  it('should not emit when locationpicker value changed with no coordinates', () => {
    component.ngOnInit();
    spyOn(component.locationChange, 'emit');
    component.locationPickerValueChanged(emptyDummyLocation);
    expect(component.locationChange.emit).toHaveBeenCalledTimes(0);
  });

  it('should call locationservice', () => {
    serviceSpy = spyOn(service, 'getLocation').and.callThrough();
    component.ngOnInit();
    component.getLocation(component.locationUrl, component.defaultLocationUrl,  dummyCoordinates);
    expect(serviceSpy).toHaveBeenCalled();
  });

  it('should call locationservice when external location id is given', () => {
    serviceSpy = spyOn(service, 'getLocation').and.callThrough();
    spyOn(service, 'validCoordinates').and.returnValue(false);
    component.location = emptyDummyLocation;
    component.ngOnChanges({
      location: new SimpleChange(
        null,
        component.location,
        true
      )
    });
    fixture.detectChanges();
    expect(serviceSpy).toHaveBeenCalled();
  });

  it('should not call locationservice when external location id and coordinates are given', () => {
    serviceSpy = spyOn(service, 'getLocation').and.callThrough();
    component.location = dummyLocation;
    component.ngOnChanges({
      location: new SimpleChange(
        null,
        component.location,
        true
      )
    });
    fixture.detectChanges();
    expect(serviceSpy).not.toHaveBeenCalled();
  });

  it('should update defaultCoordinates when external coordinates are given', () => {
    component.location = dummyLocation;
    component.ngOnChanges({
      location: new SimpleChange(
        null,
        component.location,
        true
      )
    });
    fixture.detectChanges();
    expect(component.defaultCoordinates).toBe(dummyCoordinates);
  });

  it('should not update defaultCoordinates when no external coordinates are given', () => {
    const originalValue = component.defaultCoordinates;
    component.ngOnChanges({
      location: new SimpleChange(
        null,
        component.location,
        true
      )
    });
    fixture.detectChanges();
    expect(component.defaultCoordinates).toBe(originalValue);
  });

  it('should update and show currentPickerLocation', () => {
    component.location = dummyLocation;
    component.showAddress = true;
    component.ngOnChanges({
      location: new SimpleChange(
        null,
        component.location,
        true
      )
    });
    fixture.detectChanges();
    expect(component.currentPickerLocation).toBe(dummyLocation);
  });

  it('should not update and show currentPickerLocation', () => {
    component.location = dummyLocation;
    component.showAddress = false;
    component.ngOnChanges({
      location: new SimpleChange(
        null,
        component.location,
        true
      )
    });
    fixture.detectChanges();
    expect(component.currentPickerLocation).not.toBe(dummyLocation);
  });

  it('should update defaultCoordinates', async(() => {
    component.getLocation(component.locationUrl, component.defaultLocationUrl, dummyLocation.id);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.defaultCoordinates).toBe(dummyCoordinates);
    });
  }));

  it('should update locationPicker', async(() => {
    component.showAddress = true;
    component.getLocation(component.locationUrl, component.defaultLocationUrl, dummyLocation.id);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.currentPickerLocation).toEqual(dummyLocation);
    });
  }));

  it('should clear the picker location when the clear button is pressed', () => {
    component.currentPickerLocation = dummyLocation;
    component.clear();
    expect(component.currentPickerLocation.id).toBe('');
    expect(component.currentPickerLocation.name).toBe('');
    expect(component.currentPickerLocation.locationType).toBeNull();
  });

  it('should center map when location picker value changed and polygons are defined', async(() => {
    component.ngOnInit();
    fixture.whenStable().then(() => {
      component.locationPickerValueChanged(dummyPolygonLocation);
      expect(dummyPolygonLocation.coordinates.latLng).toBeDefined();
    });
  }));
});
