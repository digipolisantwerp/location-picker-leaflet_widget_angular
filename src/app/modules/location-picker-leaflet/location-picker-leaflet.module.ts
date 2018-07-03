import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationPickerLeafletComponent } from './location-picker-leaflet.component';
import { LeafletModule } from '@acpaas-ui/leaflet';
import { LocationPickerModule } from '@acpaas-ui-widgets/ngx-location-picker';
import { HttpClientModule } from '@angular/common/http';
import { LocationPickerLeafletService } from './location-picker-leaflet.service';

@NgModule({
    imports: [
        CommonModule,
        LeafletModule,
        LocationPickerModule,
        HttpClientModule

    ],
    declarations: [LocationPickerLeafletComponent],
    providers: [LocationPickerLeafletService],
    exports: [LocationPickerLeafletComponent]
})
export class LocationPickerLeafletModule {
}
