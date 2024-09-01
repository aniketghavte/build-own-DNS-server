const dgram = require('node:dgram');
const server = dgram.createSocket('udp4');
const connectDB = require("./config/connectDB");
const Domain = require("./DB/Models/Domain.model");

const { decode, encode } = require('./dnsCore');

server.bind(53, '0.0.0.0');

console.log("Starting DNS server...");

connectDB();

server.on('message', async (msg, rinfo) => {
  const packet = decode(msg);
  console.log("packet", packet);
  try {
    const domainName = packet.questions[0].name;
    const domain = await Domain.findOne({ domainName });

    if (!domain) {
      console.error(`Domain ${domainName} not found in database`);
      return;
    }

    const response = encode({
      type: 'response',
      id: packet.id,
      flags: 0x8180,
      questions: packet.questions,
      answers: [{
        type: domain.type,
        class: 'IN',
        name: domainName,
        data: domain.value,
      }]
    });

    server.send(response, rinfo.port, rinfo.address, (err) => {
      if (err) {
        console.error(err);
      }
    });
  } catch (error) {
    console.error(`Error processing DNS request: ${error}`);
  }
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