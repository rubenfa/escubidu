$(document).ready(function() {

    let locationId = 0,
        locationWatchId,
        watching = false,
        btnGeolocate;

    function showCurrentPosition({ latitude, longitude }) {
        // adds the location to the map (`map` is a global variable)
        L.marker([ latitude, longitude ]).addTo(map);
    }

    function addLocationToList({ latitude, longitude }) {
        locationId++;

        const li = document.createElement('li');
        const text = document.createTextNode(`(#${locationId}) Lat: ${latitude}, Long: ${longitude}`);
        li.appendChild(text);

        const ul = document.getElementById('locations');
        ul.insertBefore(li, ul.firstChild);
    }

    function onCurrentPositionChanged(location) {
        const locationCoords = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        };

        showCurrentPosition(locationCoords);
        addLocationToList(locationCoords);
    }

    function stopWatching() {
        wathching = false;
        btnGeolocate.innerText = 'Start';
        navigator.geolocation.clearWatch(locationWatchId);
    }

    function startWatching() {
        watching = true;
        btnGeolocate.innerText = 'Stop';
        locationWatchId = navigator.geolocation.watchPosition(onCurrentPositionChanged);
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

    // add event listeners to the buttons so that they can perform some actions
    btnGeolocate = document.getElementById('geolocate');
    btnGeolocate.innerText = 'Start';
    btnGeolocate.addEventListener('click', onButtonGeolocateClick);

});
