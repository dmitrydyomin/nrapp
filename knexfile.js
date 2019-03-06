module.exports = {
  client: 'mysql2',
  connection: {
    database: 'app',
    user: 'app',
    password: 'app',
  },
  migrations: {
    tableName: 'knex_migrations',
  },
};
