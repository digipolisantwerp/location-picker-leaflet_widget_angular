# Location picker leaflet.

## Installing the component

Installation by npm or yarn.

* yarn add @acpaas-ui-widgets/ngx-location-leaflet-widget
* npm install --save @acpaas-ui-widgets/ngx-location-leaflet-widget

The widget comes with certain dependencies that have to be installed.

npm install @acpaas-ui-widgets/ngx-location-picker @acpaas-ui/flyout 
@acpaas-ui/flyout @acpaas-ui/leaflet @acpaas-ui/mask @acpaas-ui/selectable-list @angular/platform-server --save


## Usage
Insert LocationPickerLeafletModule in your app.module.ts.

On desired component location: 
<aui-location-leaflet-smart-widget></aui-location-leaflet-smart-widget>

###Required component inputs
* locationPickerUrl= string
* leafletMap = leafletMap
* layer= layer

example:
* locationPickerUrl= 'http://localhost:9999'
* leafletMap = 
new LeafletMap({
                       zoom: 13, // default zoom level
                       center: [51.215, 4.425], // default center point
                       onAddPolygon: (layer) => {},
                       onAddLine: (layer) => {},
                       onEditFeature: (feature) => {},
                   });
* layer= any Leaflet Layer. baseMapWorldGray and baseMapAntwerp default imported by ALeaflet component.
                             
###Component outputs
* addressResolvedCallback = function($event)

Output will have following model properties:
* latLng: {lat:number,lng:number};
* lambert: {x:number,y:number};
* placeDescription: string;
* locationSubmitter: string;
* houseNumber: number;
* postalCode: string;
* municipality: string;
* country: string;
* street: string;
* city: string;
