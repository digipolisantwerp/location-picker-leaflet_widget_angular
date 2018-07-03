
// Override the default marker. This problem is described at following github post
// https://github.com/Leaflet/Leaflet/issues/4968

 import * as L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
     iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
     shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});
