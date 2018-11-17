const dateFormat = require("dateformat");

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
      existsOrError(article.imagem, "Você não inseriu uma imagem");
    } catch (msg) {
      return res.status(400).send(msg);
    }

    app
      .db("articles")
      .insert(article)
      .then(_ => res.status(200).send(true))
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  };

  const EditaArtigo = (req, res) => {
    const article = { ...req.body };
    console.log(article);
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
      .update(article)
      .where({ id: article.id })
      .then(_ => res.send("Artigo editado  com sucesso."))
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  };

  const ListaArtigos = (req, res) => {
    app
      .db("articles")
      .then(articles => {
        console.log(articles.length);
        for (let x = 0; x < articles.length; x++) {
          const day = dateFormat(articles[x].created_at, "dd-mm-yyyy");
          console.log(day);
          articles[x].created_at = day;
        }

        res.json(articles);
      })
      .catch(err => res.status(500).send(err));
  };

  const Artigo = (req, res) => {
    app
      .db("articles")
      .where({ id: req.params.id })
      .first()
      .then(article => {
        const day = dateFormat(article.created_at, "dd-mm-yyyy");
        console.log("day", day);
        article.created_at = day;

        res.json(article);
      })
      .catch(err => res.status(500).send(err));
  };

  return { AdicionaArtigo, EditaArtigo, ListaArtigos, Artigo };
};
