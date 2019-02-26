import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { LocationPickerLeafletService } from './location-picker-leaflet.service';

const mockCoordinates = { lat: 51.19506875061893, lng: 4.381795173474985 };
const mockId = '2001887628';

const mockResponse1 = {
  location: {
    id: '2329',
    name: 'Ploegstraat 15',
    street: 'Ploegstraat',
    number: '15',
    postal: '2018',
    district: 'Antwerpen',
    locationType: 'street',
    coordinates: {
      latLng: {lat: 51.21492224512688, lng: 4.42519775286003}
    }
  }
};

const mockResponse2 = [{
  id: mockId,
  name: 'Generaal Armstrongweg 1, 2020 Antwerpen',
  street: 'Generaal Armstrongweg',
  number: '1',
  postal: '2020',
  district: 'Antwerpen',
  locationType: 'number',
  layer: 'CRAB',
  coordinates: {
    latLng: mockCoordinates,
    lambert: { x: 150910.2899999991, y: 209456.6099999994 }
  }
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
        expect(result).toEqual(mockResponse1.location);
      });

    const req = httpMock.expectOne(request => request.method === 'GET' && request.url === '/mockUrl');
    req.flush(mockResponse1);
  });

  it('should return location when prop is location id', () => {
    locationPickerLeafletService.getLocation('/mockUrl', mockId)
      .then((result: any) => {
        expect(result).toEqual(mockResponse2[0]);
      });

    const req = httpMock.expectOne(request => request.method === 'GET' && request.url === '/mockUrl');
    req.flush(mockResponse2);
  });
});
