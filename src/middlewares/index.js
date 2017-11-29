const { Composer } = require('telegraf');

const composer = new Composer();

const registerHandler = require('./register');

composer.use(registerHandler);

module.exports = composer;
