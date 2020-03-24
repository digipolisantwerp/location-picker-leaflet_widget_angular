import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletModule } from '@acpaas-ui/ngx-components/map';
import { LocationPickerModule } from '@acpaas-ui-widgets/ngx-location-picker';
import { HttpClientModule } from '@angular/common/http';

import { LocationPickerLeafletService } from './location-picker-leaflet/location-picker-leaflet.service';
import { LocationPickerLeafletComponent } from './location-picker-leaflet/location-picker-leaflet.component';
import { MAP_SERVICE_PROVIDER } from './map.provider';

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
    MAP_SERVICE_PROVIDER,
    LocationPickerLeafletService,
  ],
})
export class LocationPickerLeafletModule { }
