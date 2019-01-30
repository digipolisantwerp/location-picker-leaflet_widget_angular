import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  url = 'http://localhost:9999';
  trigger: BehaviorSubject<{ lat: number, lng: number }> = new BehaviorSubject({ lat: null, lng: null });
  triggerNoSubject: { lat: number, lng: number };
  public newCoordinates = [];
  public showDefaultAddress = false;

  constructor() {
    setTimeout(() => {
        this.newCoordinates = [51.19506875061893, 4.381795173474985];
        this.showDefaultAddress = true;
    }, 6000);
  }

  addressResolvedCallback = (location) => {
    console.log(location);
  }
}
