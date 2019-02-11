import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LocationPickerLeafletService {
  private parameter: any;

  constructor(private http: HttpClient) {
  }

  // Method to retrieve a location based on coordinates.
  getLocation = (url: string, query): Promise<any> => {
    // Check the type of queryparameter
    if (this.validCoordinates(query)) {
      this.parameter = {
        params: {
          lat: query.lat,
          lng: query.lng
        }
      };
    } else {
      this.parameter = {
        params: {
          id: query,
        }
      };
    }

    return new Promise((resolve, reject) => {
      this.http.get(url, this.parameter)
        .subscribe((response: any) => {
          // If query were coordinates
          if (response && response.location) {
            return resolve(response.location);
          }
          // If query was an ID
          if (response && response[0]) {
            return resolve(response[0]);
          }
          if (response && response.error) {
            return reject(response.error);
          }
        }, (err) => {
          return reject(err);
        });
    });
  }

  public validCoordinates(coordinates) {
    if (this.isNumber(coordinates.lat) && this.isNumber(coordinates.lng)) {
      return true;
    }
    return false;
  }

  private isNumber(n) {
    return isFinite(n);
  }
}
