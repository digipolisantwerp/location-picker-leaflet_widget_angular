import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    url = 'http://localhost:9999';
    trigger: BehaviorSubject<{ lat: number, lng: number }> = new BehaviorSubject({ lat: null, lng: null });
    triggerNoSubject: { lat: number, lng: number };

    constructor() {
        // setTimeout(() => {
        //     this.triggerNoSubject = { 'lat': 51.21025180508141, 'lng': 4.474143732169805 };
        // }, 2000);
    }

    addressResolvedCallback = (location) => {
        console.log(location);
    };
    mapChangeEvent = (location) => {
        console.log(location);
    };

}
