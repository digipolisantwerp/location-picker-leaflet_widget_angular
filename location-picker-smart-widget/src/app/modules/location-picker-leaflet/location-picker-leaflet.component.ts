import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LocationPickerValue } from '@acpaas-ui-widgets/ngx-location-picker';
import { LeafletLayer, LeafletMap } from '@acpaas-ui/leaflet';
import * as L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


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
    @Input() markerIconPath;
    @Output() addressResolvedCallback: EventEmitter<LocationPickerValue> = new EventEmitter<LocationPickerValue>();


    private marker: L.marker;

    constructor() {
    }

    ngOnInit() {


        this.leafletMap.onInit.subscribe(() => {


            this.leafletMap.addTileLayer(this.layer);
            this.marker = new L.marker(this.leafletMap.map.getCenter());
            this.marker.addTo(this.leafletMap.map);

            this.leafletMap.map.on('move', () => {
                // when the map moves, marker should be set at the center
                this.marker.setLatLng(this.leafletMap.map.getCenter());

            });
            this.leafletMap.map.on('dragend', () => {
                console.log(this.leafletMap.map.getCenter());

            });

        });

        // this.leafletMap.map
    }

    private locationPickerValueChanged = (location: LocationPickerValue) => {
        if (!location.coordinates.latLng) return;
        this.leafletMap.setView([location.coordinates.latLng.lat, location.coordinates.latLng.lng], 25);
        this.addressResolvedCallback.emit(location)
    };

}
