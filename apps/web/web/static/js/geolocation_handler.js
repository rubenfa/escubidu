const STOP_WATCHING_TEXT = 'Stop';
const START_WATCHING_TEXT = 'Start';

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
    btnGeolocate.innerText = START_WATCHING_TEXT;
    navigator.geolocation.clearWatch(locationWatchId);
}

function startWatching() {
    watching = true;
    btnGeolocate.innerText = STOP_WATCHING_TEXT;
    locationWatchId = navigator.geolocation.watchPosition(onCurrentLocationChanged);
}

function onButtonGeolocateClick(event) {
    event.preventDefault();

    if (!navigator || !navigator.geolocation) {
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
function GeolocationHandler() { }

GeolocationHandler.prototype.configure = function (element) {
    btnGeolocate = element;
    btnGeolocate.innerText = START_WATCHING_TEXT;
    btnGeolocate.addEventListener('click', onButtonGeolocateClick);
};

GeolocationHandler.prototype.addListener = function (listener) {
    listeners.push(listener);
};

export default GeolocationHandler;

