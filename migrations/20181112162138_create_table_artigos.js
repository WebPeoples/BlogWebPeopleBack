exports.up = function(knex, Promise) {
  return knex.schema.createTable("articles", table => {
    table.increments("id").primary();
    table.text("titulo").notNull();
    table.text("subtitulo").notNull();
    table.text('autor').notNull();
    table.text('texto').notNull();
    table.text('imagem').notNull();
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('articles');
};
