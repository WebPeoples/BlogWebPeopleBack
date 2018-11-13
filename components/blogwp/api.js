const fs = require("fs");

module.exports = app => {
  const {
    existsOrError,
    notExistsOrError,
    equalsOrError
  } = app.components.validation;

  const AdicionaArtigo = (req, res) => {
    const article = { ...req.body };
    try {
      existsOrError(article.titulo, "Titulo não informado");
      existsOrError(article.subtitulo, "Subtitulo não informado");
      existsOrError(article.autor, "Autor não informado");
      existsOrError(article.texto, "Texto não informado");
    } catch (msg) {
      return res.status(400).send(msg);
    }

    app
      .db("articles")
      .insert(article)
      .then(_ => res.status(204).send())
      .catch(err => res.status(500).send(err));
  };

  const EditaArtigo = (req, res) => {
    app
      .db("articles")
      .update(req.body)
      .where("id", "=", req.body.id)
      .then(_ => res.status(204).send())
      .catch(err => res.status(500).send(err));
  };

  const ListaArtigos = (req, res) => {
    app
      .db("articles")
      .then(articles => res.json(articles))
      .catch(err => res.status(500).send(err));
  };

  const Artigo = (req, res) => {
    await app
      .db("articles")
      .where({ id: req.params.id })
      .first()
      .then(article => res.json(article))
      .catch(err => res.status(500).send(err));
  };

  return { AdicionaArtigo, EditaArtigo, ListaArtigos, Artigo };
};
