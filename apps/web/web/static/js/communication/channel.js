import { Socket } from "phoenix";

function notify(payload, listeners) {
  listeners.forEach(listener => listener.onMessageReceived(payload.body));
}

function Channel() {
  this.connected = false;
  this.channel = null;
  this.listeners = [];
}

Channel.prototype.init = function () {
  let socket = new Socket('/locations_socket', {params: {token: window.userToken}});
  socket.connect();

  this.channel = socket.channel('location:all', {});
  this.channel.join()
    .receive('ok', resp => {
      this.connected = true;
      console.log('Joined successfully', resp);
    })
    .receive('error', resp => {
      this.connected = false;
      console.log('Unable to join', resp);
    });

  this.channel.on('location_message', payload => {
    notify(payload, this.listeners);
  });
}

Channel.prototype.send = function (body) {
  if (!this.connected) {
    throw new Error('Must be connected to send messages');
  }

  const message = { body };
  this.channel.push('location_message', message);  
};

Channel.prototype.addListener = function (listener) {
  this.listeners.add(listener);
};

export default Channel;

