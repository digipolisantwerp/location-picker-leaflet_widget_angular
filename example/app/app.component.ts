import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public location = {
    coordinates: {
      latLng: {
        lat: 51.19506875061893,
        lng: 4.381795173474985,
      },
    },
  };
  public showAddress = true;
  public url = 'http://localhost:9999/api/vlaanderen';

  public addressResolvedCallback = (location) => {
    console.log(location);
  }
}
