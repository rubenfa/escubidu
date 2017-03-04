// Location listeners must implement `newLocation` method
function ConsoleLocationListener() {}

ConsoleLocationListener.prototype.newLocation = function () {
    console.log('new location listened');
};

export default ConsoleLocationListener;

