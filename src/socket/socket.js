import { io } from 'socket.io-client';
import { SOCKET_URL } from '../utils/constants';

let socket = null;

export const initiateSocket = (flightId) => {
  socket = io(SOCKET_URL, {
    transports: ['websocket'],
  });
  
  if (flightId) {
    socket.emit('joinFlight', flightId);
    console.log(`Socket joined flight room: ${flightId}`);
  }
  
  return socket;
};

export const disconnectSocket = (flightId) => {
  if (socket) {
    if (flightId) {
      socket.emit('leaveFlight', flightId);
    }
    socket.disconnect();
    socket = null;
    console.log(`Socket disconnected`);
  }
};

export const subscribeToSeatUpdates = (callback) => {
  if (!socket) return;
  socket.on('seatStatusUpdated', (data) => {
    callback(data);
  });
};
