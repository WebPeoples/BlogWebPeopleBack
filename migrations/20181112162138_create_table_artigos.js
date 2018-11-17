exports.up = function(knex, Promise) {
  return knex.schema.createTable("articles", table => {
    table.increments("id").primary();
    table.text("titulo").notNull();
    table.text("subtitulo").notNull();
    table.text('autor').notNull();
    table.text('texto').notNull();
    table.text('imagem').notNull();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('update_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('articles');
};
