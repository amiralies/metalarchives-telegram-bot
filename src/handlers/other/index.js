const { Composer } = require('telegraf');

const composer = new Composer();

const cbQueryHandler = require('./cbquery');
const inlineQueryHandler = require('./inlinequery');

composer.on('callback_query', cbQueryHandler);
composer.on('inline_query', inlineQueryHandler);

module.exports = composer;
