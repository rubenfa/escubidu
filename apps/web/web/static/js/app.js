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

import socket from "./socket"

import LeafletMap from './leaflet/leaflet_map';
import ExampleMarkers from './leaflet/example_markers';
import BrowserGeolocation from './geolocation/browser_geolocation';
import GeolocationHandler from './geolocation/geolocation_handler';
import ConsoleLocationListener from './geolocation/listeners/console_location_listener';
import MarkerLocationListener from './geolocation/listeners/marker_location_listener';
import ListLocationListener from './geolocation/listeners/list_location_listener';
import SimulatorHandler from './geolocation/simulator_handler';

const MAP_ELEMENT_ID = 'map';

// Here starts our application
const map = new LeafletMap(MAP_ELEMENT_ID);
ExampleMarkers.renderInto(map);

// Start geolocation
const btnGeolocate = document.getElementById('geolocate');
const geolocation = new GeolocationHandler(new BrowserGeolocation());
geolocation.configure(btnGeolocate);

// Add location listeners
geolocation.addListener(new ConsoleLocationListener());
geolocation.addListener(new MarkerLocationListener(map));
const ulLocations = document.getElementById('locations');
const listListener = new ListLocationListener(ulLocations);
geolocation.addListener(listListener);

// Create and configure simulator
const latitudeInput = document.getElementById('latitude');
const lontitudeInput = document.getElementById('longitude');
const renderButton = document.getElementById('render');
const simulator = new SimulatorHandler();
simulator.configure(latitudeInput, lontitudeInput, renderButton);

// add geolocaiton listeners to the simulator
simulator.addListener(new ConsoleLocationListener());
simulator.addListener(new MarkerLocationListener(map));
simulator.addListener(listListener);

