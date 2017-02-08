$(document).ready(function() {

    function getFloat(inputName) {
        const $input = document.getElementById(inputName);
        const value = $input.value;
        return parseFloat(value);
    }

    function onButtonRenderClick(event) {
        event.preventDefault();

        const latitude = getFloat('latitude');
        if (isNaN(latitude)) {
            alert('Latitude should be a number like "12.34"');
            return;
        }

        const longitude  = getFloat('longitude');
        if (isNaN(longitude)) {
            alert('Longitude should be a number like "12.34"');
            return;
        }

        // adds the location to the map (`map` is a global variable)
        L.marker([ latitude, longitude ]).addTo(map);
    }

    function onButtonSendClick(event) {
        event.preventDefault();
        alert('Not implemented yet');
    }

    // add event listeners to the buttons so that they can perform some actions
    const btnRender = document.getElementById('render');
    btnRender.addEventListener('click', onButtonRenderClick);
    const btnSend = document.getElementById('send');
    btnSend.addEventListener('click', onButtonSendClick);

});
