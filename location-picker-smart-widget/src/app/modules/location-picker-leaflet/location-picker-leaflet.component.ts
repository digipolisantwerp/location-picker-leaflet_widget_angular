import { Component, OnInit } from '@angular/core';
import { LocationPickerValue } from '@acpaas-ui-widgets/ngx-location-picker';
import { baseMapAntwerp, LeafletMap } from '@acpaas-ui/leaflet';

@Component({
  selector: 'app-location-picker-leaflet',
  templateUrl: './location-picker-leaflet.component.html',
  styleUrls: ['./location-picker-leaflet.component.css']
})
export class LocationPickerLeafletComponent implements OnInit {


    location: LocationPickerValue;
     leafletMap: LeafletMap = new LeafletMap({
        zoom: 13, // default zoom level
        center: [51.215, 4.425], // default center point
        onAddPolygon: (layer) => {},
        onAddLine: (layer) => {},
        onEditFeature: (feature) => {},
    });
  constructor() { }

  ngOnInit() {
      this.leafletMap.onInit.subscribe(() => {
          // this.leafletMap.addTileLayer(baseMapWorldGray);
          this.leafletMap.addTileLayer(baseMapAntwerp);
      });
  }

}
