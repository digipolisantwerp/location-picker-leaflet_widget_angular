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
    leafletMap: LeafletMap = new LeafletMap({
        zoom: LocationPickerLeafletComponent.LEAFLET_DEFAULT_ZOOM, // default zoom level
        center: [51.215, 4.425], // default center point
        onAddPolygon: (layer) => {
        },
        onAddLine: (layer) => {
        },
        onEditFeature: (feature) => {
        }
    });

    constructor() {
        // setTimeout( ()=>{
        //     this.trigger.next({lat: 51.210354, lng: 4.474008});
        // },5000);

    }

    addressResolvedCallback = (location) => {
        console.log(location);
    };

}
