import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LocationPickerLeafletService {

    constructor(private http: HttpClient) {
    }

    // Method to retrieve a location based on coordinates.
    getLocationFromCoordinates = (url: string, coordinates): Promise<any> => {
        return new Promise((resolve, reject) => {
            this.http.get(url, {
                params: {
                    lat: coordinates.lat,
                    lng: coordinates.lng
                }
            }).subscribe((response: any) => {
                if (response && response.location) {
                    return resolve(response.location);
                }
                if (response && response.error) {
                    return reject(response.error);
                }
            }, (err) => {
                return reject(err);
            });
        });
    };
}
