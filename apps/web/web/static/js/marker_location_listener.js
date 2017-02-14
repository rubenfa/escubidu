import L from 'leaflet';

function MarkerLocationListener(map) {
    this.map = map;
}

// Location listeners must implement `newLocation` method
MarkerLocationListener.prototype.newLocation = function ({ latitude, longitude }) {
    console.log('new marker will be drawn');

    // adds the location to the map
    L.marker([ latitude, longitude ]).addTo(this.map);
};

export default MarkerLocationListener;

