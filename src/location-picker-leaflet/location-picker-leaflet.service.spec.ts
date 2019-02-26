import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Observable } from 'rxjs';
import { of } from 'rxjs';

import { LocationPickerLeafletService } from './location-picker-leaflet.service';
import {
  LocationItem,
  Coordinates,
  LocationType,
} from './LocationItem.domain';

const mockCoordinates = { lat: 51.19506875061893, lng: 4.381795173474985 };

const mockId = '2001887628';

const mockResponse1 = {
  id: 'P_DA/Locaties/MapServer/18/1168460',
  name: 'Burgemeester De Boeylaan (Deurne)',
  layer: 'straatnaam',
  locationType: LocationType.Street,
  coordinates: {
    latLng: { lat: 51.21025180508141, lng: 4.474143732169805 },
  },
  street: 'Burgemeester De Boeylaan'

};

const mockResponse2 = [{
  id: 'P_DA/Locaties/MapServer/18/1168460',
  name: 'Burgemeester De Boeylaan (Deurne)',
  layer: 'straatnaam',
  locationType: LocationType.Street,
  coordinates: {
    latLng: { lat: 51.21025180508141, lng: 4.474143732169805 },
  },
  street: 'Burgemeester De Boeylaan'

}];

describe('Location Picker Leaflet Service', () => {

  let locationPickerLeafletService: LocationPickerLeafletService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        LocationPickerLeafletService
      ]
    });
    locationPickerLeafletService = TestBed.get(LocationPickerLeafletService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should return location when props are coordinates', () => {
    locationPickerLeafletService.getLocation('/mockUrl', mockCoordinates)
      .then((result: any) => {
        expect(result).toEqual(mockResponse1);
      });

    const req = httpMock.expectOne(request => request.method === 'GET' && request.url === '/mockUrl');
    req.flush(mockResponse1);
  });

  it('should return location when prop is location id', () => {
    locationPickerLeafletService.getLocation('/mockUrl', mockId)
      .then((result: any) => {
        expect(result).toEqual(mockResponse1);
      });

    const req = httpMock.expectOne(request => request.method === 'GET' && request.url === '/mockUrl');
    req.flush(mockResponse2);
  });
});
