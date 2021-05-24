import io from 'socket.io-client';

export const socket = io('http://localhost:5000', {
  withCredentials: true,
});

socket.on('connect_error', error => {
  console.error(error.message);
});
