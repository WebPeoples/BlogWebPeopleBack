const { authSecret } = require("../../.env");
const jwt = require("jwt-simple");
const fs = require("fs");

module.exports = app => {
  const signin = (req, res) => {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send("Informe usuário e senha!");
    }

    fs.readFile("./json/adm-users.json", (err, data) => {
      const jsonData = JSON.parse(data);

      for (let x = 0; x < jsonData.length; x++) {
        // Se o email for encontrados no JSON
        if (req.body.email === jsonData[x].email) {
          // Se a senha for igual
          if (req.body.password === jsonData[x].password) {
            //Senha coincide
            const now = Math.floor(Date.now() / 1000);

            const payload = {
              id: x,
              name: jsonData[x].name,
              email: jsonData[x].email,
              iat: now,
              exp: now + 60 * 60 * 24
            };

            return res.json({
              ...payload,
              token: jwt.encode(payload, authSecret)
            });
          } else {
            return res.status(400).send("Senha inválida!");
          }
        }
      }

      return res.status(400).send("Usuário não encontrado!");
    });
  };

  const validateToken = async (req, res) => {
    const userData = req.body || null;
    console.log("validateToken")
    try {
      if (userData) {
        const token = jwt.decode(userData.token, authSecret);
        console.log(new Date(token.exp * 1000))
        console.log(new Date())
        if (new Date(token.exp * 1000) > new Date()) {
          return res.send(true);
        }
      }
    } catch (e) {
      // problema com o token
    }

    res.send(false);
  };

  return { signin, validateToken };
};
