// Location listeners must implement `newLocation` method
function SendToServerLocationListener(channel) {
    this.channel = channel;
}

SendToServerLocationListener.prototype.newLocation = function (location) {
    this.channel.send(location);
};

export default SendToServerLocationListener;

