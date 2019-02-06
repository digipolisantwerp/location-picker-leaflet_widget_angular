import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public locationObject = {
    'id': 'P_DA/Locaties/MapServer/18/1345022',
    'name': 'Bergen op Zoomlaan (Merksem)',
    'layer': 'straatnaam',
    'locationType': 'street',
    'coordinates': {
      'latLng': {'lat': 51.24848377063008, 'lng': 4.427639581145746},
    },
    'polygons': [],
    'street': 'Bergen op Zoomlaan',
    'streetid': '311',
  };
  public newCoordinates = { lat: 51.19506875061893, lng: 4.381795173474985 };
  public showAddress = true;
  public url = 'http://localhost:9999';

  public addressResolvedCallback = (location) => {
    console.log(location);
  }
}


