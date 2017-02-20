let ul,
    locationId = 0;

function ListLocationListener(ulElement) {
    ul = ulElement;
}

// Location listeners must implement `newLocation` method
ListLocationListener.prototype.newLocation = function ({ latitude, longitude }) {
    locationId++;

    const li = document.createElement('li');
    const text = document.createTextNode(`(#${locationId}) Lat: ${latitude}, Long: ${longitude}`);
    li.appendChild(text);

    ul.insertBefore(li, ul.firstChild);
};

export default ListLocationListener;

