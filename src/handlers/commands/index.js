const { Composer } = require('telegraf');

const composer = new Composer();

const startHandler = require('./start');
const helpHandler = require('./help');
const langHandler = require('./lang');
const searchbandHandler = require('./searchband');
const randombandHandler = require('./randomband');
const aboutHandler = require('./about');
const bandcountHandler = require('./bandcount');
const lyricsHandler = require('./lyrics');

composer.command('start', startHandler);
composer.command('help', helpHandler);
composer.command('lang', langHandler);
composer.command('searchband', searchbandHandler);
composer.command('randomband', randombandHandler);
composer.command('about', aboutHandler);
composer.command('bandcount', bandcountHandler);
composer.command('lyrics', lyricsHandler);

module.exports = composer;
