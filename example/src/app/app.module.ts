import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LocationPickerLeafletModule } from '@acpaas-ui-widgets/ngx-location-leaflet-widget';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        LocationPickerLeafletModule

    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
