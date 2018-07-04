import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationPickerLeafletComponent } from './location-picker-leaflet.component';
import { LeafletModule } from '@acpaas-ui/leaflet';
import { LocationPickerModule } from '@acpaas-ui-widgets/ngx-location-picker';
import { LocationPickerLeafletService } from './location-picker-leaflet.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LocationPickerValue } from '@acpaas-ui-widgets/ngx-location-picker';
describe('LocationPickerLeafletComponent', () => {

    const dummyLocation:LocationPickerValue = {
        'id': 'P_DA/Locaties/MapServer/18/1168460',
        'name': 'Burgemeester De Boeylaan (Deurne)',
        'layer': 'straatnaam',
        'locationType':  'street',
        'coordinates': {
            'lambert': { 'x': 157363.64272261, 'y': 211151.08926489 },
            'latLng': { 'lat': 51.21025180508141, 'lng': 4.474143732169805 }
        },
        'street': 'Burgemeester De Boeylaan',
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
        component.coordinatesTriggerSubject = new BehaviorSubject({ lat: null, lng: null });
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

    it('Should map correctly', () => {
        component.mapResponseToALocation(dummyLocation);
        expect(component.aLocation.placeDescription).toEqual(dummyLocation.name);
        expect(component.aLocation.latLng).toEqual(dummyLocation.coordinates.latLng);
        expect(component.aLocation.lambert).toEqual(dummyLocation.coordinates.lambert);
        expect(component.aLocation.name).toEqual(dummyLocation.name);
        expect(component.aLocation.street).toEqual(dummyLocation.street);
        expect(component.aLocation.postalCode).toEqual(undefined);
        expect(component.aLocation.locationSubmitter).toEqual(dummyLocation.locationType);
    });

    it('should emit when emit is called', () => {
        spyOn(component.locationChange, 'emit');
        component.emitValue();
        expect(component.locationChange.emit).toHaveBeenCalled();
    });
    it('should emit when locationpicker value changed', () => {
        spyOn(component.locationChange, 'emit');
        component.locationPickerValueChanged(dummyLocation);
        expect(component.locationChange.emit).toHaveBeenCalled();
    });
    it('should not emit when locationpicker value changed with no coordinates', () => {
        spyOn(component.locationChange, 'emit');
        dummyLocation.coordinates = null;
        component.locationPickerValueChanged(dummyLocation);
        expect(component.locationChange.emit).toHaveBeenCalledTimes(0);
    });

    it('should receive location from server when coordinatesTrigger changes.', () => {
        spyOn(component, 'getLocationFromCoordinates');
        component.ngOnInit();
        component.coordinatesTriggerSubject.next({ lat: 51.21025180508141, lng: 4.474143732169805 });
        expect(component.getLocationFromCoordinates).toHaveBeenCalled();
    });
});
