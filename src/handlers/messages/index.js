const { Composer } = require('telegraf');

const composer = new Composer();

const textHandler = require('./text');

composer.on('text', textHandler);

module.exports = composer;
