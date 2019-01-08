import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { baseMapAntwerp, baseMapWorldGray, LeafletMap } from '@acpaas-ui/ngx-components/map';
import * as L from 'leaflet';
import { LocationPickerLeafletService } from './location-picker-leaflet.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import './leafletMarkerFix';
import { LocationItem } from './LocationItem.domain';

@Component({
    selector: 'aui-location-picker-leaflet',
    templateUrl: './location-picker-leaflet.component.html',
    styleUrls: ['./location-picker-leaflet.component.scss']
})

export class LocationPickerLeafletComponent implements OnInit {

    public static LEAFLET_DEFAULT_ZOOM = 16;

    @Input() locationApiHost: string;
    @Input() coordinatesTriggerSubject: BehaviorSubject<{ lat: number, lng: number }>;
    @Input() inputClearVisible = false;
    @Input() useExternalOffset = false;

    @Input()
    set coordinatesTrigger(coordinates: { lat: number; lng: number }) {
        if (!coordinates || !coordinates.lat || !coordinates.lng || !this.leafletMap) {
            return;
        }
        this.getLocationFromCoordinates(coordinates);
        this.leafletMap.setView([coordinates.lat, coordinates.lng], LocationPickerLeafletComponent.LEAFLET_DEFAULT_ZOOM);
    }

    @Input() locationPickerEndpoint: string = null;
    @Input() coordinatesEndpoint: string = null;

    @Output() locationChange: EventEmitter<LocationItem> = new EventEmitter<LocationItem>();
    @Output() mapLocationChange: EventEmitter<[number, number]> = new EventEmitter<[number, number]>();

    public locationPicker: LocationItem;
    public defaultLocationPickerEndpoint = '/api/locations';
    private defaultCoordinatesEndpoint = '/api/coordinates';
    private marker: L.marker;

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
        if (!this.locationApiHost) {
            throw new Error('Attribute \'locationApiHost\' is required on aui-location-leaflet-smart-widget element.');
        }

        // Layer can only be drawn on the leaflet after it has been initted.
        this.leafletMap.onInit.subscribe(() => {

            this.leafletMap.map.options.minZoom = 12;
            this.leafletMap.map.options.maxZoom = 19;

            // Adding the layer to the leaflet.
            this.leafletMap.addTileLayer(baseMapWorldGray);
            this.leafletMap.addTileLayer(baseMapAntwerp);

            // Declare a marker with standard icon, widget can be expanded with custom icon support.
            this.marker = new L.marker(this.leafletMap.map.getCenter());

            // Add marker to the leaflet.
            this.marker.addTo(this.leafletMap.map);

            // Get the initial location if there is no external offset
            if (!this.useExternalOffset) {
                this.getLocationFromCoordinates(this.leafletMap.map.getCenter());
            }

            // Subscribe on the map move event. will trigger each time user moves the app.
            this.leafletMap.map.on('move', () => {

                // When the map moves, marker should be set at the center
                this.marker.setLatLng(this.leafletMap.map.getCenter());

                // Emit the location of the leaflet
                this.mapLocationChange.emit(this.leafletMap.map.getCenter());
            });

            // Subscribe to the dragend event. This will only trigger when the user stopped moving the map.
            // Using this event to prevent continuous calls
            this.leafletMap.map.on('dragend', () => {

                // Calling the server to get location from coordinates.
                this.getLocationFromCoordinates(this.leafletMap.map.getCenter());
            });

            this.leafletMap.map.on('locationfound', (location) => {
                this.getLocationFromCoordinates(location.latlng);
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

    getLocationFromCoordinates = (coordinates: { lat: number, lng: number }) => {
        this.locationPickerLeafletService.getLocationFromCoordinates(
            (this.locationApiHost + (this.coordinatesEndpoint ? this.coordinatesEndpoint : this.defaultCoordinatesEndpoint))
                .toString(), coordinates)
            .then((location: LocationItem) => {
                this.locationPicker = location;
                this.emitValue(location);
            }).catch(err => {
            this.locationPicker ? this.locationPicker.name = '' : console.log(err);
        });
    }
    emitValue = (location: LocationItem) => {
        this.locationChange.emit(location);
    }

    locationPickerValueChanged = (location: LocationItem) => {
        // Location picker valua has changed, which means there is a result from the server
        if (!location || !location.coordinates || !location.coordinates.latLng) {
            // centroid logic
            if (!location.polygons || !location.polygons.length) {
                return;
            }
            const arr = location.polygons[0].map(coordinate => [coordinate.lat, coordinate.lng]);
            const centerCoordinates = L.polygon(arr, {}).getBounds().getCenter();
            location.coordinates = { latLng: centerCoordinates };
        }

        this.emitValue(location);
        this.leafletMap.setView([location.coordinates.latLng.lat, location.coordinates.latLng.lng],
            LocationPickerLeafletComponent.LEAFLET_DEFAULT_ZOOM);
    }
    clear = () => {
        this.locationPicker = { id: '', name: '', locationType: null };
    }
}
