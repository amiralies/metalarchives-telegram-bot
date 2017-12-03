const { Composer } = require('telegraf');

const composer = new Composer();

const registerHandler = require('./register');
const activityHandler = require('./activity');

composer.use(registerHandler);
composer.use(activityHandler);

module.exports = composer;
