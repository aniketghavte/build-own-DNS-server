const dgram = require('node:dgram');
const server = dgram.createSocket('udp4');

const { decode, encode } = require('./dnsCore');

server.bind(53, '0.0.0.0');

console.log("Starting DNS server...");

server.on('message', (msg, rinfo) => {
  const packet = decode(msg);
  // console.log("buffer", buffer);
  console.log("packet", packet);

  // console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  const response = encode({
    type: 'response',
    id: packet.id,
    flags: 0x8180,
    questions: packet.questions,
    answers: [{
      type: 'A',
      class: 'IN',
      name: packet.questions[0].name,
      data: '1.1.1.1',
    }]
  })

  server.send(response, rinfo.port, rinfo.address, (err) => {
    if (err) {
      console.error(err);
    }
  });
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
