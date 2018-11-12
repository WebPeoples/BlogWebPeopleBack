// Update with your config settings.

module.exports = {
  client: "postgresql",
  connection: {
    database: "api_webpeople",
    user: "postgres",
    password: "Sparda11"
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: "knex_migrations"
  }
};
