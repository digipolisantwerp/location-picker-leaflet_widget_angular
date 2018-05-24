import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LocationPickerLeafletComponent } from './modules/location-picker-leaflet/location-picker-leaflet.component';
import { LocationPickerModule } from '@acpaas-ui-widgets/ngx-location-picker';
import { LeafletModule } from '@acpaas-ui/leaflet';

@NgModule({
    declarations: [
        AppComponent,
        LocationPickerLeafletComponent
    ],
    imports: [
        BrowserModule,
        LeafletModule,
        LocationPickerModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
