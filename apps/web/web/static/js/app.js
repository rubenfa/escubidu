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
import $ from "jquery";
import L from "leaflet";

$(document).ready(function() {

    /**
     * Render some markers to learn how to render them
     */
    function renderMarkers(map) {
        var checa = [ 40.588843, -1.789702 ];
        var madrid = [ 40.416887, -3.703489 ];
        var valladolid = [ 41.652271, -4.728628 ];

        var markers = [
            checa,
            madrid,
            valladolid
        ];

        markers.forEach(function(marker) {
            L.marker(marker).addTo(map);
        });
    }
  
    var centerMap = [ 40.6390, -3.1229 ];
    // choose map providers between: https://leaflet-extras.github.io/leaflet-providers/preview/
    var openStreetMap = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    // create the map
    const map = L.map('map')
                 .setView(centerMap, 8);
    
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    renderMarkers(map);
});
