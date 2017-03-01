import L from "leaflet";

const CENTER_MAP = [ 40.6390, -3.1229 ];
const INITIAL_ZOOM_LEVEL = 8;
const OSM_TILES = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const OSM_OPTIONS = {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
};

function build(elementId) {
    // create the map
    const map = L.map(elementId)
                 .setView(CENTER_MAP, INITIAL_ZOOM_LEVEL);

    L.tileLayer(OSM_TILES, OSM_OPTIONS)
     .addTo(map);

    return map;
}

const MapBuilder = { build };

export default MapBuilder;

