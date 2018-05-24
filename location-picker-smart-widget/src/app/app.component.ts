import { Component } from '@angular/core';
import { baseMapAntwerp, baseMapWorldGray, LeafletLayer, LeafletMap } from '@acpaas-ui/leaflet';
import { LocationPickerValue } from '@acpaas-ui-widgets/ngx-location-picker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

    layer:LeafletLayer =baseMapWorldGray;
    picker: LocationPickerValue;
    url:string='http://localhost:9999/api/locations';
    leafletMap: LeafletMap = new LeafletMap({
        zoom: 13, // default zoom level
        center: [51.215, 4.425], // default center point
        onAddPolygon: (layer) => {},
        onAddLine: (layer) => {},
        onEditFeature: (feature) => {},
    });

    addressResolvedCallback= (location) =>{
        console.log(location);
    }

}
