import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletModule, MapService } from '@acpaas-ui/ngx-components/map';
import { LocationPickerModule } from '@acpaas-ui-widgets/ngx-location-picker';
import { HttpClientModule } from '@angular/common/http';

import { LocationPickerLeafletService } from './location-picker-leaflet/location-picker-leaflet.service';
import { LocationPickerLeafletComponent } from './location-picker-leaflet/location-picker-leaflet.component';

@NgModule({
  imports: [
    CommonModule,
    LeafletModule,
    LocationPickerModule,
    HttpClientModule,
  ],
  exports: [
    LocationPickerLeafletComponent,
  ],
  declarations: [
    LocationPickerLeafletComponent,
  ],
  providers: [
    {
      provide: MapService,
      useValue: new MapService('browser'),
    },
    LocationPickerLeafletService,
  ],
})
export class LocationPickerLeafletModule { }
