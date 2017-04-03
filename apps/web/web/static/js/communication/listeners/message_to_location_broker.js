
// Gets a message from a channel with the server and sends it
// to a location listener
function MessageToLocationBroker (locationListener) {
    this.locationListener = locationListener;
}

MessageToLocationBroker.prototype.onMessageReceived = function (body) {
    console.log('body received in the broker', body);
    this.locationListener.newLocation(body);
};

export default MessageToLocationBroker;

