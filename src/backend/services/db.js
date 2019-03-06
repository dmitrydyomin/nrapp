const Bookshelf = require('bookshelf');
const Knex = require('knex');

const config = require('../../../knexfile');

const knex = Knex(config);
const bookshelf = Bookshelf(knex);
bookshelf.plugin('pagination');

module.exports = {
  bookshelf,
  knex,
};
