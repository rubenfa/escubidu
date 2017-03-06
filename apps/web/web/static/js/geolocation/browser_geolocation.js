let locationWatchId;

function BrowserGeolocation() {};

BrowserGeolocation.prototype.isAvailable = function () {
    return navigator || navigator.geolocation;
};

BrowserGeolocation.prototype.setLocationCallback = function (locationCallback) {
    locationWatchId = navigator.geolocation.watchPosition(locationCallback);
};

BrowserGeolocation.prototype.reset = function reset() {
    navigator.geolocation.clearWatch(locationWatchId);
};

export default BrowserGeolocation;

