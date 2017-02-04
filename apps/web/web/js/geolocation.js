$(document).ready(function() {

    function showCurrentPosition({ latitude, longitude }) {
        // adds the location to the map (`map` is a global variable)
        L.marker([ latitude, longitude ]).addTo(map);
    }

    function addLocationToList({ latitude, longitude }) {
        const li = document.createElement('li');
        const text = document.createTextNode(`Lat: ${latitude}, Long: ${longitude}`);
        li.appendChild(text);

        const ul = document.getElementById('locations');
        ul.appendChild(li);
    }

    function onCurrentPositionChanged(location) {
        const locationCoords = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        };

        showCurrentPosition(locationCoords);
        addLocationToList(locationCoords);
    }

    function onButtonGeolocateClick(event) {
        event.preventDefault();

        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(onCurrentPositionChanged);
        } else {
            alert('No se puede usar geolocalización en este navegador');
        }
    }

    debugger

    // add event listeners to the buttons so that they can perform some actions
    const btnGeolocate = document.getElementById('geolocate');
    btnGeolocate.addEventListener('click', onButtonGeolocateClick);

});
