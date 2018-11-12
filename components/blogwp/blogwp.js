module.exports = app => {

  const editaArtigo = (body, json) => {
    // json[body.index].titulo = body.titulo;
    // json[body.index].subtitulo = body.subtitulo;
    // json[body.index].autor = body.autor;
    // json[body.index].texto = body.texto;

    // if (body.imagem != json[body.index].imagem) {
    //   json[body.index].imagem = body.imagem;
    // }

    app.db('articles')
                .update(user)
                .where(body)
                .whereNull('deletedAt')
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))

    return json;
  };

  
  return { editaArtigo };
};
