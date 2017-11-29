const { Composer } = require('telegraf');

const composer = new Composer();

const startHandler = require('./start');
const helpHandler = require('./help');
const langHandler = require('./lang');

composer.command('start', startHandler);
composer.command('help', helpHandler);
composer.command('lang', langHandler);

module.exports = composer;
