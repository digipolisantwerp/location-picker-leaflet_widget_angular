import { Component } from '@angular/core';
import { baseMapWorldGray, LeafletLayer, LeafletMap } from '@acpaas-ui/leaflet';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { baseMapAntwerp } from '@acpaas-ui/leaflet';
import { LocationPickerLeafletComponent } from './modules/location-picker-leaflet/location-picker-leaflet.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    url: string = 'http://localhost:9999';
    trigger: BehaviorSubject<{ lat: number, lng: number }> = new BehaviorSubject({ lat: null, lng: null });
    constructor() {

    }

    addressResolvedCallback = (location) => {
        console.log(location);
    };

}
