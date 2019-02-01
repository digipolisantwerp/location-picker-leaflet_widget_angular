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
import { LocationItem } from './LocationItem.domain';

@Component({
  selector: 'aui-location-picker-leaflet',
  templateUrl: './location-picker-leaflet.component.html',
  styleUrls: ['./location-picker-leaflet.component.scss']
})
export class LocationPickerLeafletComponent implements OnChanges, OnInit {
  public static LEAFLET_DEFAULT_ZOOM = 16;

  @Input() url: string;
  @Input() inputClearVisible = false;
  @Input() coordinates: { lat: number; lng: number };
  @Input() showAddress = false;

  @Input() locationUrl: string;
  @Input() coordinatesUrl: string;

  @Output() locationChange: EventEmitter<LocationItem> = new EventEmitter<
    LocationItem
  >();
  @Output() mapLocationChange: EventEmitter<
    [number, number]
  > = new EventEmitter<[number, number]>();

  public locationPicker: LocationItem;
  public defaultCoordinates = { lat: 51.215, lng: 4.425 }; // default center point
  public defaultLocationUrl = '/api/locations';
  public leafletMap: LeafletMap;

  private defaultCoordinatesUrl = '/api/coordinates';
  private marker: L.marker;

  constructor(
    private locationPickerLeafletService: LocationPickerLeafletService
  ) {}

  public ngOnChanges(changes: SimpleChanges) {
    const coordinatesChanged: SimpleChange = changes.coordinates;
    this.defaultCoordinates =
      coordinatesChanged &&
      this.validCoordinates(coordinatesChanged.currentValue)
        ? coordinatesChanged.currentValue
        : this.defaultCoordinates;
    if (this.leafletMap) {
      this.getLocationFromCoordinates(this.defaultCoordinates);
      this.leafletMap.setView(
        [this.defaultCoordinates.lat, this.defaultCoordinates.lng],
        LocationPickerLeafletComponent.LEAFLET_DEFAULT_ZOOM
      );
    }
  }

  public ngOnInit() {
    this.leafletMap = new LeafletMap({
      zoom: LocationPickerLeafletComponent.LEAFLET_DEFAULT_ZOOM, // default zoom level
      center: this.defaultCoordinates
    });

    // Checks  the required attributes
    if (!this.url) {
      throw new Error(
        `Attribute 'url' is required on aui-location-leaflet-smart-widget element.`
      );
    }

    // Layer can only be drawn on the leaflet after it has been initiated.
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
      this.getLocationFromCoordinates(this.defaultCoordinates);

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

      this.leafletMap.map.on('locationfound', location => {
        this.getLocationFromCoordinates(location.latlng);
      });
    });
  }

  public getLocationFromCoordinates = (coordinates: { lat: number; lng: number }) => {
    this.locationPickerLeafletService
      .getLocationFromCoordinates(
        (
          this.url +
          (this.coordinatesUrl ? this.coordinatesUrl : this.defaultCoordinatesUrl)
        ).toString(),
        coordinates
      )
      .then((location: LocationItem) => {
        if (this.showAddress) {
          this.locationPicker = location;
        }
        this.emitValue(location);
      })
      .catch(err => {
        this.locationPicker
          ? (this.locationPicker.name = '')
          : console.log(err);
      });
  }

  public emitValue = (location: LocationItem) => {
    this.locationChange.emit(location);
  }

  public locationPickerValueChanged = (location: LocationItem) => {
    // Location picker value has changed, which means there is a result from the server
    if (!location || !location.coordinates || !location.coordinates.latLng) {
      // centroid logic
      if (!location.polygons || !location.polygons.length) {
        return;
      }
      const arr = location.polygons[0].map(coordinate => [
        coordinate.lat,
        coordinate.lng
      ]);
      const centerCoordinates = L.polygon(arr, {})
        .getBounds()
        .getCenter();
      location.coordinates = { latLng: centerCoordinates };
    }

    this.emitValue(location);
    this.leafletMap.setView(
      [location.coordinates.latLng.lat, location.coordinates.latLng.lng],
      LocationPickerLeafletComponent.LEAFLET_DEFAULT_ZOOM
    );
  }

  public clear = () => {
    this.locationPicker = { id: '', name: '', locationType: null };
  }

  private isNumber(n) {
    return !isNaN(+n) && isFinite(n);
  }

  private validCoordinates(coordinates) {
    if (this.isNumber(coordinates.lat) && this.isNumber(coordinates.lng)) {
      return true;
    }
    return false;
  }
}
