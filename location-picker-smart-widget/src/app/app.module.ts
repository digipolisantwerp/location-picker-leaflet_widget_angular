import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LocationPickerLeafletComponent } from './modules/location-picker-leaflet/location-picker-leaflet.component';

@NgModule({
    declarations: [
        AppComponent,
        LocationPickerLeafletComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
