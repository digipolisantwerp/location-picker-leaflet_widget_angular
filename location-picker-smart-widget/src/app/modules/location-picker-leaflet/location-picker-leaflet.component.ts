import { Component, Input, OnInit } from '@angular/core';
import { LocationPickerValue } from '@acpaas-ui-widgets/ngx-location-picker';
import { LeafletLayer, LeafletMap } from '@acpaas-ui/leaflet';

@Component({
    selector: 'app-location-picker-leaflet',
    templateUrl: './location-picker-leaflet.component.html',
    styleUrls: ['./location-picker-leaflet.component.css']
})
export class LocationPickerLeafletComponent implements OnInit {

    @Input() locationPicker: LocationPickerValue;
    @Input() url: string;
    @Input() leafletMap: LeafletMap;
    @Input() layer: LeafletLayer;

    constructor() {
    }

    ngOnInit() {

        this.leafletMap.onInit.subscribe(() => {

            console.log(this.url);
            console.log(this.locationPicker);

            console.log(this.leafletMap);
            console.log(this.layer);
            // this.leafletMap.addTileLayer(baseMapWorldGray);
            this.leafletMap.addTileLayer(this.layer);
        });
    }

    private locationPickerValueChanged = (location: LocationPickerValue) => {
        console.log(location);
    };

}
