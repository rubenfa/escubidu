import EventFake from './event_fake';

function ButtonFake() {}

ButtonFake.prototype.addEventListener = function(eventName, eventHandler) {
  this.eventHandler = eventHandler;
};

ButtonFake.prototype.fireEvent = function () {
  this.eventHandler(new EventFake());
};

export default ButtonFake;

