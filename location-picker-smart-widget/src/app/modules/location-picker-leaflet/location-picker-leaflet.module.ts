import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationPickerLeafletComponent } from './location-picker-leaflet.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LocationPickerLeafletComponent],
    exports:[LocationPickerLeafletComponent]
})
export class LocationPickerLeafletModule { }
