const {VITE_SERVER_HOST, VITE_SERVER_PORT} = import.meta.env

const SERVER_API =  `${VITE_SERVER_HOST}:${VITE_SERVER_PORT}`;

export default SERVER_API;