import ExampleMarkers from '../../../../web/static/js/leaflet/example_markers'

describe('ExampleMarkers', function() {

    describe('#renderInto', () => {
        
        function spyMap() {
            return {
              addMarkers: jasmine.createSpy('addMarkers')
            };
        }

        it('adds markers to the map', () => {
            const map = spyMap();
            ExampleMarkers.renderInto(map);
            expect(map.addMarkers).toHaveBeenCalled();
        });

    });
  
});

