import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationPickerLeafletComponent } from './location-picker-leaflet.component';
import { LeafletModule } from '@acpaas-ui/leaflet';
import { LocationPickerModule } from '@acpaas-ui-widgets/ngx-location-picker';

@NgModule({
    imports: [
        CommonModule,
        LeafletModule,
        LocationPickerModule

    ],
    declarations: [LocationPickerLeafletComponent],
    exports: [LocationPickerLeafletComponent]
})
export class LocationPickerLeafletModule {
}
