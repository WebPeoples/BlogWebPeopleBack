module.exports = app => {
  // Rotas protegidas
  app.route("/AdicionaArtigo").all(app.config.passport.authenticate()).post(app.components.blogwp.api.AdicionaArtigo);
  app.route("/EditaArtigo").all(app.config.passport.authenticate()).post(app.components.blogwp.api.EditaArtigo);


  // Rotas não protegidas
  app.route("/ListaArtigos").get(app.components.blogwp.api.ListaArtigos);
  app.route("/artigo/:id").get(app.components.blogwp.api.Artigo);
  app.route("/signin").post(app.components.blogwp.user.signin);
  app.route("/validateToken").post(app.components.blogwp.user.validateToken);
};
