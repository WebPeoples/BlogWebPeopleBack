const app = require("express")();

const consign = require("consign");

consign()
  .include("./config/passport.js")
  .then("./config/middlewares.js")
  .then('./components/validation.js')
  .then("./components/blogwp/blogwp.js")
  .then("./components/blogwp")
  .then("./config/routes.js")
  .into(app);

app.listen(4000, () => {
  console.log("iniciando servidor backend...");
});
