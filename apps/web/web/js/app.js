$(document).ready(function() {

    function renderRoutes() {
        for (i = 0; i < routes.length; i++) {
            var customIcon = routes[i].icon;
            var customColor = routes[i].color;
            var gpxs = routes[i].gpx;
            for (j = 0; j < gpxs.length; j++){
                // Custom link
                var customLink = "";
                if (gpxs[j].link){
                    customLink = "<br/><a href='" + gpxs[j].link + "' target='new'>Ver historia</a>";
                }
                // Route gpx
                new L.GPX(gpxs[j].source, {
                    max_point_interval: 7200000,
                    gpx_options: {
                        parseElements: ['route', 'track']
                    },
                    async: true,
                    marker_options: {
                        startIcon: new L.AwesomeMarkers.icon({
                            icon: customIcon,
                            prefix: 'ion',
                            markerColor: customColor,
                            iconColor: 'white',
                        }),
                        startIconUrl: null,
                        endIconUrl: null,
                        shadowUrl: null
                    },
                    polyline_options: {
                        color: customColor
                    },
                    customLink: customLink,
                    customIcon: customIcon
                })
                .on('loaded', function(e){
                    // Popup
                    var link = e.target.options.customLink;
                    var icon = e.target.options.customIcon;
                    var name = e.target.get_name();
                    var distance = (e.target.get_distance() / 1000).toFixed(2);
                    var content = "<i class='icon ion-" + icon + "'></i> <strong>" + name + "</strong> (" + distance + " km)" + link;
                    e.target.bindPopup(content);
                }).addTo(map);
            }
        }
    }

    /**
     * Render some markers to learn how to render them
     */
    function renderMarkers(map) {
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
  
    var centerMap = [ 40.6390, -3.1229 ];
    // choose map providers between: https://leaflet-extras.github.io/leaflet-providers/preview/
    var openStreetMap = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    // create the map
    map = L.map('map', {
        center: centerMap,
        zoom: 8,
        layers: [ openStreetMap ]
    });

    var hash = new L.Hash(map);
    renderRoutes();
    renderMarkers(map);
});
