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
          if (response && response.error) {
            return reject(response.error);
          }
          // If query were coordinates, response will be a single object
          if (response && response.location) {
            return resolve(response.location);
          }
          // If query was an ID, response will be an array, but only containing 1 object
          if (response && response.length) {
            return resolve(response[0]);
          }
        }, (err) => {
          return reject(err);
        });
    });
  }

  public validCoordinates(coordinates) {
    if (isFinite(coordinates.lat) && isFinite(coordinates.lng)) {
      return true;
    }
    return false;
  }
}
