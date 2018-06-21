import { Component } from '@angular/core';
import { baseMapWorldGray, LeafletLayer, LeafletMap } from '@acpaas-ui/leaflet';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {



    layer: LeafletLayer = baseMapWorldGray;
    url: string = 'http://localhost:9999/api/locations';
    leafletMap: LeafletMap = new LeafletMap({
        zoom: 13, // default zoom level
        center: [51.215, 4.425], // default center point
        onAddPolygon: (layer) => {
        },
        onAddLine: (layer) => {
        },
        onEditFeature: (feature) => {
        }
    });

    constructor() {
    }

    addressResolvedCallback = (location) => {
        console.log(location);
    };

}
