import GeolocationHandler from '../../../../web/static/js/geolocation/geolocation_handler';

import ButtonFake from '../doubles/button_fake';
import BrowserGeolocationFake from '../doubles/browser_geolocation_fake';

describe('GeolocationHandler', function() {

    function spyBrowserGeolocation() {
        return {
          isAvailable: jasmine.createSpy('isAvailable').and.returnValue(true),
          setLocationCallback: jasmine.createSpy('setLocationCallback'),
          reset: jasmine.createSpy('reset')
        };
    }
        
    describe('#configure', () => {
        
        it('sets a new CSS class in the toggle button', () => {
            const button = new ButtonFake();
            const handler = new GeolocationHandler();
            handler.configure(button);

            expect(button.className).toEqual('play');
        });

        it('sets an event handler to the button', () => {
            const button = new ButtonFake();
            spyOn(button, 'addEventListener');
            const handler = new GeolocationHandler();
            handler.configure(button);

            expect(button.addEventListener).toHaveBeenCalled();
        });

    });
  
    describe('#startWatching', () => {

        it('initializes browser geolocation api when user clicks on "Play"', () => {
            const browserGeolocation = spyBrowserGeolocation();
            const button = new ButtonFake();
            const handler = new GeolocationHandler(browserGeolocation);
            handler.configure(button);

            button.fireEvent();

            expect(browserGeolocation.setLocationCallback).toHaveBeenCalled();
        });

        it('toggles button CSS class to "stop"', () => {
            const browserGeolocation = spyBrowserGeolocation();
            const button = new ButtonFake();
            const handler = new GeolocationHandler(browserGeolocation);
            handler.configure(button);

            button.fireEvent();

            expect(button.className).toEqual("stop");
        });

    });
  
    describe('#stopWatching', () => {

        it('resets geolocation api', () => {
            const browserGeolocation = spyBrowserGeolocation();
            const button = new ButtonFake();
            const handler = new GeolocationHandler(browserGeolocation);
            handler.configure(button);

            button.fireEvent(); // play
            button.fireEvent(); // stop

            expect(browserGeolocation.reset).toHaveBeenCalled();
        });

        it('toggles buttons text to "play" again', () => {
            const browserGeolocation = spyBrowserGeolocation();
            const button = new ButtonFake();
            const handler = new GeolocationHandler(browserGeolocation);
            handler.configure(button);

            button.fireEvent(); // play
            button.fireEvent(); // stop

            expect(button.className).toEqual('play');
        });

    });
  
    describe('#addListener', () => {

        function spyListener() {
            return {
              newLocation: jasmine.createSpy('newLocation')
            };
        }
        
        it('adds a listener that will be notified when geolocation API sends a new location', () => {
            const listener = spyListener();
            const browserGeolocation = new BrowserGeolocationFake();
            const button = new ButtonFake();
            const handler = new GeolocationHandler(browserGeolocation);
            handler.configure(button);
            handler.addListener(listener);

            button.fireEvent();
            browserGeolocation.fireLocationEvent();

            expect(listener.newLocation).toHaveBeenCalled();
        });

    });
  
});

