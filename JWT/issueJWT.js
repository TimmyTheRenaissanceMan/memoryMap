//jshint esversion: 9
const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');

const PRIV_KEY = fs.readFileSync("./JWT/id_rsa_priv.pem", 'utf8');

module.exports = (function issueJWT(user) {
  const expiresIn = '1d';

  const payload = {
    sub: user,
    iat: Date.now()
  };

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn
  };
});
