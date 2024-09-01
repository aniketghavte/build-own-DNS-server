const Domain = require("../Models/Domain.model");

const resolveDNS = async (packet, server, rinfo) => {
    try {
        const domainName = packet.questions[0].name;
        const domain = await
        Domain.findOne({ domainName });

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
    }
    catch (error) {
        console.error(`Error processing DNS request: ${error}`);
    }
}

module.exports = resolveDNS;