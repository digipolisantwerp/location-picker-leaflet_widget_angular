# Location picker leaflet.

## Installing the component

Installation by npm or yarn.

* yarn add @acpaas-ui-widgets/ngx-location-leaflet-widget
* npm install --save @acpaas-ui-widgets/ngx-location-leaflet-widget

The widget comes with certain dependencies that have to be installed.

npm install @acpaas-ui-widgets/ngx-location-picker @acpaas-ui/flyout @acpaas-ui/flyout @acpaas-ui/leaflet @acpaas-ui/mask @acpaas-ui/selectable-list @angular/platform-server --save


## Usage
Insert LocationPickerLeafletModule in your app.module.ts.

On desired component location: 
<aui-location-leaflet-smart-widget></aui-location-leaflet-smart-widget>

###Required component inputs
* locationPickerUrl= string => points to the location-picker backend host. 


###Optional component inputs
* coordinatesTriggerSubject =  BehaviorSubject({ lat: number, lng: number }); 
=> can be used to trigger an external location change.
* coordinatesTrigger = Object({ lat: number, lng: number })
=> when set will retrieve location by coordinates

* locationPickerEndpoint = string => when /api/location is not default endpoint.
* coordinatesEndpoint = string => when /api/coordinates is not default endpoint.
                             
###Component outputs
* locationChange = function($event)

Output will be an LocationItem model.

