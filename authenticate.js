var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var passport = require('passport');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const User = require("./models/User")

var opts = {};
const secretKey = "12345-67890-09876-54321"
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secretKey;

const getUser = async obj => {
    return await User.findOne({
    where: obj,
  });
  };
// lets create our strategy for web token
let strategy = new JwtStrategy(opts, (jwt_payload, next) => {
    console.log('payload received', jwt_payload.id);
    let user = getUser({ id: jwt_payload.id });
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  });
  // use the strategy
  passport.use(strategy);

exports.verifyUser = passport.authenticate('jwt', {session: false});

exports.getToken = (user) => {
    return jwt.sign(user, secretKey,
        {
            expiresIn: 241920
        });
};

