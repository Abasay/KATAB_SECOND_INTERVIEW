const axios = require('axios');
const dns = require('dns')

const isVpn = (ip) => {
  return new Promise((resolve, reject) => {
    dns.resolve4(`${ip}.dnsbl.spamhaus.org`, (err, addresses) => {
      if (err) {
        return resolve(false);
      }
      resolve(addresses.length > 0);
    });
  });
};
const vpnMiddleware = async (req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const data = await isVpn(ip);

  if (data && (data.vpn || data.proxy)) {
    return res.status(403).send('Access denied: VPN detecteds');
  }

  next();
};

module.exports = vpnMiddleware