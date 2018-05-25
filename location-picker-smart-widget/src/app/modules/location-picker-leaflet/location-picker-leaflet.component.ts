
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LocationPickerValue } from '@acpaas-ui-widgets/ngx-location-picker';
import { LeafletLayer, LeafletMap } from '@acpaas-ui/leaflet';
import * as L from 'leaflet';
import { LocationPickerLeafletService } from './location-picker-leaflet.service';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


@Component({
    selector: 'aui-location-leaflet-smart-widget',
    templateUrl: './location-picker-leaflet.component.html',
    styleUrls: ['./location-picker-leaflet.component.css']
})
export class LocationPickerLeafletComponent implements OnInit {

    private locationPicker: LocationPickerValue;

    @Input() locationPickerUrl: string;
    @Input() leafletMap: LeafletMap;
    @Input() layer: LeafletLayer;
    @Output() addressResolvedCallback: EventEmitter<LocationPickerValue> = new EventEmitter<LocationPickerValue>();


    private marker: L.marker;

    constructor(private locationPickerLeafletService:LocationPickerLeafletService) {
    }

    ngOnInit() {



        // Checks  the required attributes
        if(!this.locationPickerUrl) throw new Error("Attribute 'locationPickerUrl' is required on aui-location-leaflet-smart-widget element.");
        if(!this.leafletMap) throw new Error("Attribute 'leafletMap' is required on aui-location-leaflet-smart-widget element.");
        if(!this.layer) throw new Error("Attribute 'layer' is required on aui-location-leaflet-smart-widget element.");

        // Set the server url in the service
        this.locationPickerLeafletService.setUrl(this.locationPickerUrl);

        // Layer can only be drawn on the leaflet after it has been initted.
        this.leafletMap.onInit.subscribe(() => {


            // Adding the layer to the leaflet.
            this.leafletMap.addTileLayer(this.layer);

            // Declare a marker with standard icon, widget can be expanded with custom icon support.
            this.marker = new L.marker(this.leafletMap.map.getCenter());

            //Add marker to the leaflet.
            this.marker.addTo(this.leafletMap.map);

            // Subscribe on the map move event. will trigger each time user moves the app.
            this.leafletMap.map.on('move', () => {

                // when the map moves, marker should be set at the center
                this.marker.setLatLng(this.leafletMap.map.getCenter());

            });

            // Subscribe to the dragend event. This will only trigger when the user stopped moving the map.
            // Using this event to prevent continuous calls
            this.leafletMap.map.on('dragend', () => {

                //Calling the server to get location from coordinates
                this.locationPickerLeafletService.getLocationFromCoordinates(this.leafletMap.map.getCenter());
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
