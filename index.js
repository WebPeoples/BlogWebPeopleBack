const app = require("express")();

const consign = require("consign");

const db = require("./config/db");

app.db = db;

const port = process.env.PORT || 3000;

consign()
  .then("./config/middlewares.js")
  .include("./config/passport.js")
  .then("./components/validation.js")
  .then("./components/blogwp/blogwp.js")
  .then("./components/blogwp")
  .then("./config/routes.js")
  .into(app);

app.listen(port, () => {
  console.log("iniciando servidor backend...");
});
