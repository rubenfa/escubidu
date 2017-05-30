import BrowserGeolocation from './browser_geolocation';

const STOP_WATCHING_TEXT = 'Stop';
const START_WATCHING_TEXT = 'Start';

let geolocation;
let btnGeolocate;
let locationWatchId;
let watching = false;
let listeners = [];

function onCurrentLocationChanged(location) {
    const locationCoords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
    };

    listeners.forEach(listener => listener.newLocation(locationCoords));
}

function stopWatching() {
    watching = false;
    btnGeolocate.className = 'play';
    geolocation.reset();
}

function startWatching() {
    watching = true;
    btnGeolocate.className = 'stop';
    geolocation.setLocationCallback(onCurrentLocationChanged);
}

function onButtonGeolocateClick(event) {
    event.preventDefault();

    if (!geolocation.isAvailable()) {
        alert('No se puede usar geolocalización en este navegador');
        return;
    }

    if (watching) {
        stopWatching();
        return;
    }

    startWatching();
}

// constructor
// This is the exported function/class
function GeolocationHandler(browserGeolocation) {
    watching = false;
    geolocation = browserGeolocation;
}

GeolocationHandler.prototype.configure = function (element) {
    btnGeolocate = element;
    btnGeolocate.className = 'play';
    btnGeolocate.addEventListener('click', onButtonGeolocateClick);
};

GeolocationHandler.prototype.addListener = function (listener) {
    listeners.push(listener);
};

export default GeolocationHandler;

