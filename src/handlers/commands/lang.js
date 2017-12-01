const { Markup } = require('telegraf');
const languages = require('../../../config/languages.json');

const langHandler = ({ i18n, reply }) => {
  const langButtons = [];
  languages.forEach((item) => {
    const action = `lang:${item.code}`;
    langButtons.push(Markup.callbackButton(item.name, action));
  });
  const langKeyboard = Markup.inlineKeyboard(langButtons);
  reply(i18n.t('choose_lang'), langKeyboard.extra());
};

module.exports = langHandler;
