$(document).ready(function() {

    function showCurrentPosition(location) {
        const latitude = location.coords.latitude;
        const longitude = location.coords.longitude;

        // adds the location to the map (`map` is a global variable)
        L.marker([ latitude, longitude ]).addTo(map);
    }

    function onButtonGeolocateClick(event) {
        event.preventDefault();

        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showCurrentPosition);
        } else {
            alert('No se puede usar geolocalización en este navegador');
        }
    }

    debugger

    // add event listeners to the buttons so that they can perform some actions
    const btnGeolocate = document.getElementById('geolocate');
    btnGeolocate.addEventListener('click', onButtonGeolocateClick);

});
