const { Composer } = require('telegraf');

const composer = new Composer();

const cbQueryHandler = require('./cbquery');

composer.on('callback_query', cbQueryHandler);

module.exports = composer;
