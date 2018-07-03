import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LocationPickerValue } from '@acpaas-ui-widgets/ngx-location-picker';
import { baseMapAntwerp, baseMapWorldGray, LeafletMap } from '@acpaas-ui/leaflet';
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
    selector: 'aui-location-picker-leaflet',
    templateUrl: './location-picker-leaflet.component.html',
    styleUrls: ['./location-picker-leaflet.component.css']
})
export class LocationPickerLeafletComponent implements OnInit {

    public static LEAFLET_DEFAULT_ZOOM = 16;

    @Input() locationApiHost: string;
    @Input() coordinatesTriggerSubject: BehaviorSubject<{ lat: number, lng: number }>;
    @Input('coordinatesTrigger')
    set coordinatesTrigger(coordinates: { lat: number; lng: number }) {
        // this._coordinatesTrigger = coordinates;
        console.log(coordinates)
        if (!coordinates || !coordinates.lat || !coordinates.lng || !this.leafletMap) {
            return;
        }
        this.getLocationFromCoordinates(coordinates);
        this.leafletMap.setView([coordinates.lat, coordinates.lng], LocationPickerLeafletComponent.LEAFLET_DEFAULT_ZOOM);
    }
    @Output() locationChange: EventEmitter<ALocation> = new EventEmitter<ALocation>();

    private locationPicker: LocationPickerValue;
    private locationPickerEndpoint = '/api/locations';
    private marker: L.marker;
    aLocation = new ALocation({});

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





    constructor(private locationPickerLeafletService: LocationPickerLeafletService) {
    }

    ngOnInit() {

        // Checks  the required attributes
        if (!this.locationApiHost) throw new Error('Attribute \'locationApiHost\' is required on aui-location-leaflet-smart-widget element.');

        // Layer can only be drawn on the leaflet after it has been initted.
        this.leafletMap.onInit.subscribe(() => {


            // Adding the layer to the leaflet.
            this.leafletMap.addTileLayer(baseMapWorldGray);
            this.leafletMap.addTileLayer(baseMapAntwerp);

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

                // Calling the server to get location from coordinates.
                this.getLocationFromCoordinates(this.leafletMap.map.getCenter());

            });

        });

        if (this.coordinatesTriggerSubject) {
            this.coordinatesTriggerSubject.subscribe(coordinates => {
                if (!coordinates.lat || !coordinates.lng) {
                    return;
                }
                this.getLocationFromCoordinates(coordinates);
                this.leafletMap.setView([coordinates.lat, coordinates.lng], LocationPickerLeafletComponent.LEAFLET_DEFAULT_ZOOM);
            });
        }

    }

    getLocationFromCoordinates = (coordinates) => {
        this.locationPickerLeafletService.getLocationFromCoordinates(this.locationApiHost, coordinates).then(location => {
            this.mapResponseToALocation(location);
            this.emitValue();

        }).catch(err => {
            console.log(err);
        });
    };
    emitValue = () => {
        this.locationChange.emit(this.aLocation);
    };
    mapResponseToALocation = (location) => {

        this.locationPicker = location;
        this.aLocation.latLng = location.coordinates ? location.coordinates.latLng : { lat: undefined, lng: undefined };
        this.aLocation.lambert = location.coordinates ? location.coordinates.lambert : { x: undefined, y: undefined };
        this.aLocation.street = location.street;
        this.aLocation.placeDescription = location.name;
        this.aLocation.postalCode = location.postal;
        this.aLocation.houseNumber = location.number;
        this.aLocation.locationSubmitter = location.locationType;
        this.aLocation.name = location.name;
    };

    locationPickerValueChanged = (location: LocationPickerValue) => {
        // Location picker valua has changed, which means there is a result from the server
        if (!location || !location.coordinates || !location.coordinates.latLng) {
            // centroid logic
            return;
        }

        this.mapResponseToALocation(location);
        this.emitValue();
        this.leafletMap.setView([location.coordinates.latLng.lat, location.coordinates.latLng.lng], LocationPickerLeafletComponent.LEAFLET_DEFAULT_ZOOM);

    };

}
