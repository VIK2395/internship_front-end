import io from 'socket.io-client';

export const socket = io(process.env.REACT_APP_BACK_END_DOMAIN, {
  withCredentials: true,
});

socket.on('connect_error', error => {
  console.error(error.message);
});
