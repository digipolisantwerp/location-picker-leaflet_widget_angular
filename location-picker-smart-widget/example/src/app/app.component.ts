import { Component } from '@angular/core';
import { baseMapWorldGray, LeafletLayer, LeafletMap } from '@acpaas-ui/leaflet';
import { LocationPickerValue } from '@acpaas-ui-widgets/ngx-location-picker';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

    url: string = 'http://localhost:9999';
    trigger: BehaviorSubject<{ lat: number, lng: number }> = new BehaviorSubject({ lat: null, lng: null });

    constructor() {
    }

    addressResolvedCallback = (location) => {
        console.log(location);
    };
}
