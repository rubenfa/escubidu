
function LocationEvent() {
    this.coords = {
        latitude: 40.1,
        longitude: -3.7
    }
}

function BrowserGeolocationFake() {
  this.callback = null;
}

BrowserGeolocationFake.prototype.isAvailable = function () {
  return true;
};

BrowserGeolocationFake.prototype.setLocationCallback = function (callback) {
    this.callback = callback;
};

BrowserGeolocationFake.prototype.fireLocationEvent = function () {
    const event = new LocationEvent();
    this.callback(event);
};

BrowserGeolocationFake.prototype.reset = function () { };

export default BrowserGeolocationFake;

