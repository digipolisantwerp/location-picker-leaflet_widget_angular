export class ALocation {

    latLng: {lat:number,lng:number};
    lambert: {x:number,y:number};
    placeDescription: string;
    locationSubmitter: string;
    houseNumber: number;
    postalCode: string;
    municipality: string;
    country: string;
    street: string;
    city: string;

    constructor(data: any) {
        this.latLng = data.latLng ? data.latLng : {};
        this.lambert = data.lambert ? data.lambert : {};
        this.placeDescription = data.placeDescription ? data.placeDescription : null;
        this.locationSubmitter = data.locationSubmitter ? data.locationSubmitter : null;
        this.houseNumber = data.houseNumber ? data.houseNumber : null;
        this.postalCode = data.postalCode ? data.postalCode : null;
        this.municipality = data.municipality ? data.municipality : null;
        this.country = data.country ? data.country : null;
        this.street = data.street ? data.street : null;
        this.city = data.city ? data.city : null;
    }
}
