const os = require('os');
const _ = require('lodash');

const getLocalIp = () => {
  const interfaces = os.networkInterfaces();
  const interfacesValues = _.values(interfaces);
  const addresses = _.flatten(interfacesValues);
  const localAddress = _.find(addresses, { family: 'IPv4', internal: false });
  return localAddress ? localAddress.address : null;
};

module.exports = getLocalIp;
