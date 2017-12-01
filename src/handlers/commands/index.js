const { Composer } = require('telegraf');

const composer = new Composer();

const startHandler = require('./start');
const helpHandler = require('./help');
const langHandler = require('./lang');
const searchbandHandler = require('./searchband');

composer.command('start', startHandler);
composer.command('help', helpHandler);
composer.command('lang', langHandler);
composer.command('searchband', searchbandHandler);

module.exports = composer;
