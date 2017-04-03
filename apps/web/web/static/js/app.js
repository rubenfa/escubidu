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

import LeafletMap from './leaflet/leaflet_map';
import ExampleMarkers from './leaflet/example_markers';
import BrowserGeolocation from './geolocation/browser_geolocation';
import GeolocationHandler from './geolocation/geolocation_handler';
import ConsoleLocationListener from './geolocation/listeners/console_location_listener';
import MarkerLocationListener from './geolocation/listeners/marker_location_listener';
import ListLocationListener from './geolocation/listeners/list_location_listener';
import SendToServerLocationListener from './geolocation/listeners/send_to_server_location_listener';
import SimulatorHandler from './geolocation/simulator_handler';
import Channel from './communication/channel';
import MessageToLocationBroker from './communication/listeners/message_to_location_broker';

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
// geolocation.addListener(new MarkerLocationListener(map)); // this is added later, to draw locations sent by the server
const ulLocations = document.getElementById('locations');
const listListener = new ListLocationListener(ulLocations);
geolocation.addListener(listListener);

// Create and configure simulator
const latitudeInput = document.getElementById('latitude');
const lontitudeInput = document.getElementById('longitude');
const renderButton = document.getElementById('render');
const simulator = new SimulatorHandler();
simulator.configure(latitudeInput, lontitudeInput, renderButton);

// add geolocation listeners to the simulator
simulator.addListener(new ConsoleLocationListener());
// simulator.addListener(new MarkerLocationListener(map));  // this is added later, to draw locations sent by the server
simulator.addListener(listListener);

// create and initialize channel with server
const channel = new Channel();
channel.init();

// add listeners related to the channel
const sendToServerLocationListener = new SendToServerLocationListener(channel);
geolocation.addListener(sendToServerLocationListener);
simulator.addListener(sendToServerLocationListener);

// message broker
const broker = new MessageToLocationBroker(new MarkerLocationListener(map));
channel.addListener(broker);

