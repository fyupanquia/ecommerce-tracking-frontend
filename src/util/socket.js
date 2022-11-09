import io from "socket.io-client";
import credentials from "credentials.json";

let socket;

export const getSocket = () => {
  if (!socket) socket = io(credentials.SERVER_URL);
  return socket;
};

export const on = (event, callback) => {
  getSocket().on(event, callback);
};
export const off = (event) => getSocket().off(event);
