# Location Picker with Leaflet Smart Widget UI (Angular)

This is the Angular 6+ UI for a Smart Widget implementing a picker field to choose a location (street, address or point of interest) in combination with Leaflet. It is matched by a [corresponding back-end service](https://github.com/digipolisantwerp/location-picker_service_nodejs) which is needed when running it in remote mode. A default implementation for selecting locations in Antwerp is provided.

![screenshot](example.png)

There is a demo app, see below for instructions on running it.

## How to use

### Installing

```sh
> npm install @acpaas-ui-widgets/ngx-location-picker-leaflet
```

### Using

A BFF service should be running (see demo app instructions below for how to start one).

Import the component in your module:

```ts
import { LocationPickerLeafletModule } from '@acpaas-ui-widgets/ngx-location-picker-leaflet';

@NgModule({
  imports: [
    ...,
    LocationPickerLeafletModule
  ],
  ...
})
```

In the `index.html`, include the core branding stylesheet:

```html
<link rel="stylesheet" href="https://cdn.antwerpen.be/core_branding_scss/3.0.3/main.min.css">
```

Add the leaflet CSS styles to the `angular.json` file.

```css
"styles": [
  "node_modules/leaflet/dist/leaflet.css",
  "node_modules/leaflet-draw/dist/leaflet.draw.css"
]
```

### In your template:

```html
<aui-location-picker-leaflet class="widget"
    [coordinates]="newCoordinates"
    [showAddress]="showAddress"
    [url]="http://localhost:9999"
    (locationChange)="addressResolvedCallback($event)"
></aui-location-picker-leaflet>
```

(replace the url of the BFF service)

In the component code:

```ts
class YourComponent {

    addressResolvedCallback = (location) => {
        console.log(location);
    };

    ...
}
```

Every value in the backing list must have a unique id.

### Supported attributes

- **url**: (string) required URL of the back-end service feeding this widget
- **coordinatesUrl**: (string) when `/api/coordinates` is not the required endpoint to get data based on coordinates
- **locationUrl**: (string) when `/api/locations` is not the required endpoint to get data based on location
- **coordinates**: (Object({ lat: number, lng: number })) will center the map on the given latitude and longitude coordinates at the initialization of the widget
- **locationObject**: (Object(LocationItem) will prefill the input field with the location name if `showAddress` is set to true and will center the map based on the location. When you set this attribute, the widget doesn't have to make an extra api call on initialization to get the location details. When both `locationObject` and `coordinates` are set, the value of the latter will be overruled.
- **showAddress**: (boolean(false)) whether or not to show the address in the input field at the initialization of the widget

### Events

- **locationChange**: locationItem model that is triggered when the current value is changed (or cleared)
- **mapLocationChange**: a [number,number] object with the marker position that is triggered each time the map moves

### Protocol

The back-end service implements the following protocol:

- GET /path/to/endpoint?search=...&types=...
- **search**: the text that the user typed on which to match
- **types**: a comma-separated list of types to return, default value = 'street,number,poi'
- **result**: JSON-encoded array of [LocationPickerValue](https://github.com/digipolisantwerp/location-picker_widget_angular/blob/master/src/location-picker/location-picker.types.ts) objects

## Run the demo app

```sh
> npm install
> npm start
```

Browse to [localhost:4200](http://localhost:4200)

To use this widget, you will also need to run [the backing service](https://github.com/digipolisantwerp/location-picker_service_nodejs).

## Support

> For projects that are still using Angular 5, we are [maintaining a v1 branch](https://github.com/digipolisantwerp/location-picker-leaflet_widget_angular/tree/v1), which will still receive bug fixes if needed.

```sh
> npm install @acpaas-ui-widgets/ngx-location-picker-leaflet"<2.0.0"
```

## Contributing

We welcome your bug reports and pull requests.

Please see our [contribution guide](CONTRIBUTING.md).

## License

This project is published under the [MIT license](LICENSE.md).
