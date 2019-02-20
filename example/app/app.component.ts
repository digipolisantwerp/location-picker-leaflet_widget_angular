import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public location = {
    id: '2001887628',
    name: 'Generaal Armstrongweg 1, 2020 Antwerpen',
    coordinates: {
      // When disabled the widget will get the coordinates based on the location id
      // latLng: {lat: 51.19506875061893, lng: 4.381795173474985},
    }
  };
  public showAddress = true;
  public url = 'http://localhost:9999';

  public addressResolvedCallback = (location) => {
    console.log(location);
  }
}
