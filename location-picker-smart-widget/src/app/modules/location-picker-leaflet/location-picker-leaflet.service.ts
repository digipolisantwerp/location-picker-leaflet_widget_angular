import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LocationPickerLeafletService {

    constructor(private http: HttpClient) {
    }

    private url: string;
    setUrl = (url: string) => {

        this.url = url;
    };

    getLocationFromCoordinates = (coordinates): Promise<any> => {
        return new Promise((resolve, reject) => {
            this.http.get(this.url, {
                params: {
                    lat: coordinates.lat,
                    lng: coordinates.lng
                }
            }).subscribe((response: any) => {
                if (response.body) {
                    return resolve(response.body);
                }
                if (response.error) {
                    return reject(response.error);
                }
            });
        });
    };
}
