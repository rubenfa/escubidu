
let latitude;
let longitude;
let render;
const listeners = [];

function getFloat($input) {
    const value = $input.value;
    return parseFloat(value);
}

function onRenderButtonClick(event) {
    event.preventDefault();

    const latitudeValue = getFloat(latitude);
    if (isNaN(latitudeValue)) {
        alert('Latitude should be a number like "12.34"');
        return;
    }

    const longitudeValue = getFloat(longitude);
    if (isNaN(longitudeValue)) {
        alert('Longitude should be a number like "12.34"');
        return;
    }

    const locationCoords = {
        latitude: latitudeValue,
        longitude: longitudeValue
    };

    listeners.forEach(listener => listener.newLocation(locationCoords));
}

// constructor
// This is the exported function/class
function SimulatorHandler() { }

SimulatorHandler.prototype.configure = function (latitudeInput, lontitudeInput, renderButton) {
    latitude = latitudeInput;
    longitude = lontitudeInput;
    render = renderButton;

    render.addEventListener('click', onRenderButtonClick);
};

SimulatorHandler.prototype.addListener = function (listener) {
    listeners.push(listener);
};

export default SimulatorHandler;

