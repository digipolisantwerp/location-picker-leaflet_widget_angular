import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public locationObject = {
    id: 'P_DA/Locaties/MapServer/19/8',
    name: 'BERENDRECHT_ZANDVLIET_LILLO',
    coordinates: {
      latLng: {lat: 51.334855295811295, lng: 4.29289442516156},
    },
    layer: 'district',
    locationType: 'poi',
  };
  public newCoordinates = { lat: 51.19506875061893, lng: 4.381795173474985 };
  public showAddress = true;
  public url = 'http://localhost:9999';

  public addressResolvedCallback = (location) => {
    console.log(location);
  }
}
