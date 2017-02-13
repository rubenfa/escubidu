import L from 'leaflet';

/**
 * Render some markers to learn how to render them
 */
function renderInto(map) {
    var checa = [ 40.588843, -1.789702 ];
    var madrid = [ 40.416887, -3.703489 ];
    var valladolid = [ 41.652271, -4.728628 ];

    var markers = [
        checa,
        madrid,
        valladolid
    ];

    markers.forEach(function(marker) {
        L.marker(marker).addTo(map);
    });
}

const ExampleMarkers = { renderInto };

export default ExampleMarkers;

