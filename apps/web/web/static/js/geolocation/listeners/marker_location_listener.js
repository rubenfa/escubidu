
function MarkerLocationListener(map) {
    this.map = map;
}

// Location listeners must implement `newLocation` method
MarkerLocationListener.prototype.newLocation = function ({ latitude, longitude }) {
    const marker = [ latitude, longitude ];
    const markers = [ marker ];
    this.map.addMarkers(markers);
};

export default MarkerLocationListener;

