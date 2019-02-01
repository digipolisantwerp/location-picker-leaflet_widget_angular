import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public newCoordinates = { lat: 51.19506875061893, lng: 4.381795173474985 };
  public showAddressOnInit = true;
  public url = 'http://localhost:9999';

  public addressResolvedCallback = (location) => {
    console.log(location);
  }
}
