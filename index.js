const app = require("express")();

const consign = require("consign");

const db = require("./config/db");

app.db = db;

const port = process.env.PORT || 3000;
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, OPTIONS"
  );
  next();
});

consign()
  .include("./config/passport.js")
  .then("./config/middlewares.js")
  .then("./components/validation.js")
  .then("./components/blogwp/blogwp.js")
  .then("./components/blogwp")
  .then("./config/routes.js")
  .into(app);

app.listen(port, () => {
  console.log("iniciando servidor backend...");
});
