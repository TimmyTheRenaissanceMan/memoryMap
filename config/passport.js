//jshint esversion:6
const fs = require('fs');
const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;
const PUB_KEY = fs.readFileSync("./JWT/id_rsa_pub.pem");

module.exports = ((passport) => {
const User = require("../schemas/user");

// TODO
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"]
};

const jwtStrategy = new JwtStrategy(options, function(jwt_payload, done) {
    User.findOne({_id: jwt_payload.sub})
      .then((user) => {
        return user ? done(null, user) : done(null, false);
      })
      .catch(err => done(err, null));
});

  passport.use(User.createStrategy());
  passport.use(jwtStrategy);

  return passport;
});
//
