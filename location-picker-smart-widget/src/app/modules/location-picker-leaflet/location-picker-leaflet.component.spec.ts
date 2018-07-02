import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationPickerLeafletComponent } from './location-picker-leaflet.component';
import { LeafletMap, LeafletModule } from '@acpaas-ui/leaflet';
import { LocationPickerModule } from '@acpaas-ui-widgets/ngx-location-picker';
import { LocationPickerLeafletService } from './location-picker-leaflet.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

describe('LocationPickerLeafletComponent', () => {

    const testLocation = {
        'id': 'P_DA/Locaties/MapServer/18/1168460',
        'name': 'Burgemeester De Boeylaan (Deurne)',
        'layer': 'straatnaam',
        locationType: 'street',
        'coordinates': {
            'lambert': { 'x': 157363.64272261, 'y': 211151.08926489 },
            'latLng': { 'lat': 51.21025180508141, 'lng': 4.474143732169805 }
        },
        'street': 'Burgemeester De Boeylaan',
        'district': 'Deurne'
    };
    let component: LocationPickerLeafletComponent;
    let element: any;
    let fixture: ComponentFixture<LocationPickerLeafletComponent>;
    let service: LocationPickerLeafletService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LocationPickerLeafletComponent],
            providers: [LocationPickerLeafletService],
            imports: [LeafletModule,
                LocationPickerModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LocationPickerLeafletComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;

        component.leafletMap = new LeafletMap({
            zoom: LocationPickerLeafletComponent.LEAFLET_DEFAULT_ZOOM, // default zoom level
            center: [51.215, 4.425], // default center point
            onAddPolygon: (layer) => {
            },
            onAddLine: (layer) => {
            },
            onEditFeature: (feature) => {
            }
        });
        component.locationApiHost = 'https://localhost';
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
        component.ngOnInit();
        expect(component).toBeTruthy();
    });
    it('should throw error when locationApiHost is null.', () => {
        component.locationApiHost = null;
        expect(() => {
            component.ngOnInit();
            throw new Error();
        }).toThrow();
    });
    it('should throw error when leaflet is null.', () => {
        component.leafletMap = null;
        expect(() => {
            component.ngOnInit();
            throw new Error();
        }).toThrow();
    });

    it('Should map correctly', () => {
        component.mapResponseToALocation(testLocation);
        expect(component.aLocation.placeDescription).toEqual(testLocation.name);
        expect(component.aLocation.latLng).toEqual(testLocation.coordinates.latLng);
        expect(component.aLocation.lambert).toEqual(testLocation.coordinates.lambert);
        expect(component.aLocation.name).toEqual(testLocation.name);
        expect(component.aLocation.street).toEqual(testLocation.street);
        expect(component.aLocation.postalCode).toEqual(undefined);
        expect(component.aLocation.locationSubmitter).toEqual(testLocation.locationType);
    });

    it('should emit when emit is called', () => {
        spyOn(component.addressResolvedCallback, 'emit');
        component.emitValue();
        expect(component.addressResolvedCallback.emit).toHaveBeenCalled();
    });
    it('should emit when locationpicker value changed', () => {
        spyOn(component.addressResolvedCallback, 'emit');
        component.locationPickerValueChanged(testLocation);
        expect(component.addressResolvedCallback.emit).toHaveBeenCalled();
    });

    it('should receive location from server when coordinatesTrigger changes.', () => {
        spyOn(component, 'getLocationFromCoordinates');
        component.coordinatesTrigger = new BehaviorSubject({ lat: null, lng: null });
        component.ngOnInit();
        component.coordinatesTrigger.next({ lat: 51.21025180508141, lng: 4.474143732169805 });
        expect(component.getLocationFromCoordinates).toHaveBeenCalled();
    });
});
