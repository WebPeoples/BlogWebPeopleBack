const { authSecret } = require("../.env");
const passport = require("passport");
const passportJwt = require("passport-jwt");
const { Strategy, ExtractJwt } = passportJwt;
const fs = require("fs");

module.exports = app => {
  const params = {
    secretOrKey: authSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  };

  const strategy = new Strategy(params, (payload, done) => {
    fs.readFile("./json/adm-users.json", (err, data) => {
      const jsonData = JSON.parse(data);
      // Se o email for encontrados no JSON
      if (jsonData[payload.id].email) {
        // Se a senha for igual
        if (jsonData[payload.id].password) {
         return done(null, { ...payload });
        }
      }
      done(err, false);
    });
  });

  passport.use(strategy);

  return {
    authenticate: () => passport.authenticate("jwt", { session: false })
  };
};
