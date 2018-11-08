const fs = require("fs");

module.exports = app => {
 
  const { editaArtigo } = app.components.blogwp.blogwp

  const AdicionaArtigo = (req, res) => {
    fs.readFile("./json/artigos.json", function(err, data) {
      if (err) { res.sendStatus(500); } else {var json = JSON.parse(data);
        json.push(req.body);
        fs.writeFile("./json/artigos.json", JSON.stringify(json), error => {
          if (error) throw error;
        });
        res.sendStatus(200);
      }
    });
  };

  const EditaArtigo = (req, res) => {
    fs.readFile("./json/artigos.json", function(err, data) {
        if (err) throw  res.sendStatus(500).send(err);
        var json = JSON.parse(data);
        
        editaArtigo(req.body, json);

        fs.writeFile("./json/artigos.json", JSON.stringify(editaArtigo(req.body, json)), error => {
            if (error) throw error;
          }
        );
        res.sendStatus(200);
      }
    );
  };

  const ListaArtigos = (req, res) => {
    fs.readFile("./json/artigos.json", (err, data) => {
      let json = JSON.parse(data);
      return res.json(json);
    });
  };

  const Artigo = (req, res) => {
    fs.readFile("./json/artigos.json", (err, data) => {
      if (err) throw err;
      const json = JSON.parse(data);

      let response = {
        titulo: json[req.params.id].titulo,
        subtitulo: json[req.params.id].subtitulo,
        imagem: json[req.params.id].imagem,
        autor: json[req.params.id].autor,
        data_criacao: json[req.params.id].data_criacao,
        texto: json[req.params.id].texto
      };

      res.json(response);
    });
  };

  return { AdicionaArtigo, EditaArtigo, ListaArtigos, Artigo };
};
