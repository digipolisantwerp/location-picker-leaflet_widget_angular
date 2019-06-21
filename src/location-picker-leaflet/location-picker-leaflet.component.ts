import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges,
  SimpleChanges,
  SimpleChange
} from '@angular/core';
import {
  baseMapAntwerp,
  baseMapWorldGray,
  LeafletMap
} from '@acpaas-ui/ngx-components/map';
import * as L from 'leaflet';
import { LocationPickerLeafletService } from './location-picker-leaflet.service';
import './leafletMarkerFix';
import { LocationItem, Coordinates } from './LocationItem.domain';

@Component({
  selector: 'aui-location-picker-leaflet',
  templateUrl: './location-picker-leaflet.component.html',
  styleUrls: ['./location-picker-leaflet.component.scss']
})
export class LocationPickerLeafletComponent implements OnChanges, OnInit {

  @Input() inputClearVisible = false;
  @Input() location: LocationItem;
  @Input() showAddress = false;
  @Input() url: string;
  @Input() placeholder = '';

  // Override the default endpoints
  @Input() coordinatesUrl: string;
  @Input() locationUrl: string;

  @Output() locationChange: EventEmitter<LocationItem> = new EventEmitter<
    LocationItem
  >();
  @Output() mapLocationChange: EventEmitter<
    [number, number]
  > = new EventEmitter<[number, number]>();

  public defaultCoordinates = { lat: 51.215, lng: 4.425 }; // default center point
  public defaultLocationUrl = '';
  public leafletMap: LeafletMap;
  public leafletDefaultZoom = 16;
  public leafletMinZoom = 12;
  public leafletMaxZoom = 19;
  public loading = true;
  public locationPickerUrl = '';
  public currentPickerLocation: LocationItem;

  private newLocation: LocationItem;
  private defaultCoordinatesUrl = '/coordinates';
  private getLocationWithId = false;
  private marker: L.marker;

  constructor(
    private locationPickerLeafletService: LocationPickerLeafletService
  ) { }

  public ngOnChanges(changes: SimpleChanges) {
    const locationPropChanged: SimpleChange = changes.location;

    // Set the Location picker value and default coordinates if a location object is given and showAddress is true
    if (locationPropChanged && locationPropChanged.currentValue != null) {
      this.newLocation = locationPropChanged.currentValue;

      // Create a const that either contains coordinates or is an empty object
      const coordinatesValues = ((this.newLocation.coordinates || {}).latLng || {});

      // If there are coordinates, set them as the defaultCoordinates
      if (this.locationPickerLeafletService.validCoordinates(coordinatesValues)) {
        this.defaultCoordinates = this.newLocation.coordinates.latLng;
      }

      // Show location in locationPicker
      if (this.showAddress) {
        this.currentPickerLocation = this.newLocation;
      }
    }

    // If the Leaflet map is already set, center the map on the new location
    if (this.leafletMap) {
      this.leafletMap.setView(
        [this.defaultCoordinates.lat, this.defaultCoordinates.lng],
        this.leafletDefaultZoom
      );
    }
  }

  public ngOnInit() {
    this.initializeMap();

    // Checks the required attributes
    if (!this.url) {
      throw new Error(
        `Attribute 'url' is required on aui-location-leaflet-smart-widget element.`
      );
    }

    // Set the locationUrl
    this.locationPickerUrl = this.createUrl(this.locationUrl, this.defaultLocationUrl);
  }

  public initializeMap = () => {
    this.leafletMap = new LeafletMap({
      zoom: this.leafletDefaultZoom, // default zoom level
      center: this.defaultCoordinates,
    });

    // MAP SCAFFOLDING
    // Layer can only be drawn on the leaflet after it has been initiated.
    this.leafletMap.onInit.subscribe(() => {
      this.leafletMap.map.options.minZoom = this.leafletMinZoom;
      this.leafletMap.map.options.maxZoom = this.leafletMaxZoom;

      // Adding the layer to the leaflet.
      this.leafletMap.addTileLayer(baseMapWorldGray);
      this.leafletMap.addTileLayer(baseMapAntwerp);

      // Declare a marker with standard icon, widget can be expanded with custom icon support.
      this.marker = new L.marker(this.centerCoordinates());

      // Add marker to the leaflet.
      this.marker.addTo(this.leafletMap.map);

      // Get the initial location if there is no location Object
      if (!this.location) {
        this.getLocation(this.coordinatesUrl, this.defaultCoordinatesUrl, this.defaultCoordinates);
      }

      // Subscribe on the map move event. will trigger each time user moves the map.
      this.leafletMap.map.on('move', () => {
        // When the map moves, marker should be set at the center
        const coordinates = this.centerCoordinates();
        this.marker.setLatLng(coordinates);

        // Emit the location of the leaflet
        this.mapLocationChange.emit(coordinates);
      });

      // Subscribe to the dragend event. This will only trigger when the user stopped moving the map.
      // Using this event to prevent continuous calls
      this.leafletMap.map.on('dragend', () => {
        // Calling the server to get location from coordinates.
        this.getLocation(this.coordinatesUrl, this.defaultCoordinatesUrl, this.centerCoordinates());
      });

      this.leafletMap.map.on('locationfound', location => {
        this.getLocation(this.coordinatesUrl, this.defaultCoordinatesUrl, location.latlng);
      });
    });
    this.loading = false;
  }

  public getLocation = (customUrl: string, defaultUrl: string, query: any) => {
    this.locationPickerLeafletService
      .getLocation(
        this.createUrl(customUrl, defaultUrl),
        query
      )
      // set the location in the Location Picker if address should be shown
      .then((location: LocationItem) => {
        if (this.showAddress) {
          this.currentPickerLocation = location;
        }
        this.defaultCoordinates = location.coordinates.latLng;
        this.emitValue(location);
        if (this.loading) {
          this.initializeMap();
        }
      })
      .catch(err => {
        this.currentPickerLocation
          ? (this.currentPickerLocation.name = '')
          : console.log(err);
      });
  }

  public emitValue = (location: LocationItem) => {
    this.locationChange.emit(location);
  }

  // WHEN LOCATION PICKER VALUE CHANGED, UPDATE MAP
  public locationPickerValueChanged = (location: LocationItem) => {
    // Location picker value has changed, which means there is a result from the server
    if (!location || !location.coordinates || !location.coordinates.latLng) {
      // centroid logic
      if (!location.polygons || !location.polygons.length) {
        return;
      }
      const arr = location.polygons[0].map(coordinate => [
        coordinate.lat,
        coordinate.lng,
      ]);
      const centerCoordinates = L.polygon(arr, {})
        .getBounds()
        .getCenter();
      location.coordinates = { latLng: centerCoordinates };
    }
    this.emitValue(location);
    this.leafletMap.setView(
      [location.coordinates.latLng.lat, location.coordinates.latLng.lng],
      this.leafletDefaultZoom
    );
  }

  // HELPERS
  public clear = () => {
    this.currentPickerLocation = { id: '', name: '', locationType: null };
  }

  private createUrl = (customUrl, defaultUrl) => {
    return (
      this.url +
      (customUrl ? customUrl : defaultUrl)
    ).toString();
  }

  private centerCoordinates = () => {
    return this.leafletMap.map.getCenter();
  }
}
