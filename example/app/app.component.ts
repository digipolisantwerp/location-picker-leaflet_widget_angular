import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public locationObject = {
    id: '311',
    coordinates: {
      latLng: {lat: 51.24843262434907, lng: 4.427903258539865}
    },
    district: 'Merksem',
    locationType: 'street',
    name: 'Bergen op Zoomlaan 2',
    number: '2',
    postal: '2170',
    street: 'Bergen op Zoomlaan',
  };
  public newCoordinates = { lat: 51.19506875061893, lng: 4.381795173474985 };
  public showAddress = true;
  public url = 'http://localhost:9999';

  public addressResolvedCallback = (location) => {
    console.log(location);
  }
}


