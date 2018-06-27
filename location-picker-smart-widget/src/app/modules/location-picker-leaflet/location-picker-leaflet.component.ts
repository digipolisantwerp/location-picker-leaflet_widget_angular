import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LocationPickerValue } from '@acpaas-ui-widgets/ngx-location-picker';
import { LeafletLayer, LeafletMap } from '@acpaas-ui/leaflet';
import * as L from 'leaflet';
import { LocationPickerLeafletService } from './location-picker-leaflet.service';
import { ALocation } from './ALocation.domain';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

@Component({
    selector: 'aui-location-leaflet-smart-widget',
    templateUrl: './location-picker-leaflet.component.html',
    styleUrls: ['./location-picker-leaflet.component.css']
})
export class LocationPickerLeafletComponent implements OnInit {

    private locationPicker: LocationPickerValue;
    private locationPickerEndpoint = '/api/locations';
    private aLocation = new ALocation({});
    @Input() locationApiHost: string;
    @Input() leafletMap: LeafletMap;
    @Input() layer: LeafletLayer;
    @Input() coordinatesTrigger: BehaviorSubject<{ lat: number, lng: number }>;
    @Output() addressResolvedCallback: EventEmitter<ALocation> = new EventEmitter<ALocation>();

    private marker: L.marker;

    constructor(private locationPickerLeafletService: LocationPickerLeafletService) {
    }

    ngOnInit() {

        // Checks  the required attributes
        if (!this.locationApiHost) throw new Error('Attribute \'locationPickerUrl\' is required on aui-location-leaflet-smart-widget element.');
        if (!this.leafletMap) throw new Error('Attribute \'leafletMap\' is required on aui-location-leaflet-smart-widget element.');
        if (!this.layer) throw new Error('Attribute \'layer\' is required on aui-location-leaflet-smart-widget element.');

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
            this.leafletMap.map.on('dragend', (e) => {

                console.log(e);
                // Calling the server to get location from coordinates.
                this.getLocationFromCoordinates(this.leafletMap.map.getCenter());

            });

            if (this.coordinatesTrigger) {
                this.coordinatesTrigger.subscribe(coordinates => {
                    console.log(coordinates);
                    if(!coordinates.lat || !coordinates.lng){
                        return;
                    }
                    this.getLocationFromCoordinates(coordinates);
                    this.leafletMap.setView([coordinates.lat, coordinates.lng], 25);
                });

            }

        });

    }

    private getLocationFromCoordinates = (coordinates) => {
        this.locationPickerLeafletService.getLocationFromCoordinates(this.locationApiHost, coordinates).then(location => {
            console.log(location);
            this.mapResponseToALocation(location);
            this.emitValue();

        }).catch(err => {
            console.log(err);
        });
    };
    private emitValue = () => {
        // console.log(this.aLocation);
        this.addressResolvedCallback.emit(this.aLocation);
    };
    private mapResponseToALocation = (location => {
        this.locationPicker = location;
        this.aLocation.latLng = location.coordinates.latLng;
        this.aLocation.lambert = location.coordinates.lambert;
        this.aLocation.street = location.street;
        this.aLocation.placeDescription = location.name;
        this.aLocation.postalCode = location.postal;
        this.aLocation.houseNumber = location.number;
        this.aLocation.locationSubmitter = location.locationType;
    });

    private locationPickerValueChanged = (location: LocationPickerValue) => {
        // Location picker valua has changed, which means there is a result from the server

        if (!location || !location.coordinates.latLng) {
            console.log(location.id);
            // centroid logic
            return;
        }
        console.log(location.coordinates);
        this.mapResponseToALocation(location);
        this.leafletMap.setView([location.coordinates.latLng.lat, location.coordinates.latLng.lng], 25);
        this.emitValue();
    };

}
