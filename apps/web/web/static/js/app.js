// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"
import MapBuilder from './map_builder';
import ExampleMarkers from './example_markers';
import GeolocationHandler from './geolocation_handler';
import ConsoleLocationListener from './console_location_listener';

const MAP_ELEMENT_ID = 'map';

// Here starts our application
const map = MapBuilder.build(MAP_ELEMENT_ID);
ExampleMarkers.renderInto(map);

// Start geolocation
const btnGeolocate = document.getElementById('geolocate');
const geolocation = new GeolocationHandler();
geolocation.configure(btnGeolocate);
geolocation.addListener(new ConsoleLocationListener());

