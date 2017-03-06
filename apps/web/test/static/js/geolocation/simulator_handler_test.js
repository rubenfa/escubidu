import SimulatorHandler from '../../../../web/static/js/geolocation/simulator_handler';

import ButtonFake from '../doubles/button_fake';

describe('SimulatorHandler', function() {

    describe('#configure', () => {
        
        it('configures an event handler', () => {
            let render = new ButtonFake();
            spyOn(render, 'addEventListener');

            const handler = new SimulatorHandler();
            handler.configure(null, null, render);

            expect(render.addEventListener).toHaveBeenCalled();
        });

    });
  
    describe('#addListener', () => {

        function spyListener() {
            return {
              newLocation: jasmine.createSpy('newLocation')
            };
        }
        
        it('adds a listener to be called when event is fired', () => {
            const listener = spyListener();
            const input = { value: 14.2 }; // each input text has a value
            let render = new ButtonFake();

            const handler = new SimulatorHandler();
            handler.configure(input, input, render);

            handler.addListener(listener);
            render.fireEvent(); // simulates firing an event

            expect(listener.newLocation).toHaveBeenCalled();
        });

    });
  
});

