const dgram = require('node:dgram');

const server = dgram.createSocket('udp4');

server.bind(53, '0.0.0.0');

console.log("Starting DNS server...");

server.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg}`);
});
server.on('error', (err) => {
  console.error(`server error:\n${err.stack}`);
  server.close();
});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});


server.on('close', () => {
  console.log('Server closed');
});
