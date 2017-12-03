const { Composer } = require('telegraf');

const composer = new Composer();

const startHandler = require('./start');
const helpHandler = require('./help');
const langHandler = require('./lang');
const searchbandHandler = require('./searchband');
const randombandHandler = require('./randomband');

composer.command('start', startHandler);
composer.command('help', helpHandler);
composer.command('lang', langHandler);
composer.command('searchband', searchbandHandler);
composer.command('randomband', randombandHandler);

module.exports = composer;
