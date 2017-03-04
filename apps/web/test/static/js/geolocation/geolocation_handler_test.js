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
        
        it('sets a new text in the toggle button', () => {
            const button = new ButtonFake();
            const handler = new GeolocationHandler();
            handler.configure(button);

            expect(button.innerText).toEqual('Start');
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

        it('initializes browser geolocation api when user clicks on "Start"', () => {
            const browserGeolocation = spyBrowserGeolocation();
            const button = new ButtonFake();
            const handler = new GeolocationHandler(browserGeolocation);
            handler.configure(button);

            button.fireEvent();

            expect(browserGeolocation.setLocationCallback).toHaveBeenCalled();
        });

        it('toggles buttons text to "Stop"', () => {
            const browserGeolocation = spyBrowserGeolocation();
            const button = new ButtonFake();
            const handler = new GeolocationHandler(browserGeolocation);
            handler.configure(button);

            button.fireEvent();

            expect(button.innerText).toEqual("Stop");
        });

    });
  
    describe('#stopWatching', () => {

        it('resets geolocation api', () => {
            const browserGeolocation = spyBrowserGeolocation();
            const button = new ButtonFake();
            const handler = new GeolocationHandler(browserGeolocation);
            handler.configure(button);

            button.fireEvent(); // start
            button.fireEvent(); // stop

            expect(browserGeolocation.reset).toHaveBeenCalled();
        });

        it('toggles buttons text to "Start" again', () => {
            const browserGeolocation = spyBrowserGeolocation();
            const button = new ButtonFake();
            const handler = new GeolocationHandler(browserGeolocation);
            handler.configure(button);

            button.fireEvent(); // start
            button.fireEvent(); // stop

            expect(button.innerText).toEqual('Start');
        });

    });
  
    describe('#addLister', () => {

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

