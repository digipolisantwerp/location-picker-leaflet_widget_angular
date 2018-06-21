import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationPickerLeafletComponent } from './location-picker-leaflet.component';
import { LocationPickerLeafletModule } from './location-picker-leaflet.module';
import { LeafletModule } from '@acpaas-ui/leaflet';
import { LocationPickerModule } from '@acpaas-ui-widgets/ngx-location-picker';


describe('LocationPickerLeafletComponent', () => {
  let component: LocationPickerLeafletComponent;

  let fixture: ComponentFixture<LocationPickerLeafletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationPickerLeafletComponent ],
        imports:[    LeafletModule,
            LocationPickerModule
            ]
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
  it('',()=>{
    //   const testString = 'test';
    //   component.locationPickerUrl = testString
    // expect(component.locationPickerUrl).toBe(testString)
  });
});
