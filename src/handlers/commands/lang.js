const { Markup } = require('telegraf');
const languages = require('../../../config/languages.json');


const langHandler = ({ i18n, reply }) => {
  const langButtons = [];
  languages.forEach((item) => {
    const action = {
      type: 'language_change',
      payload: { langCode: item.code },
    };
    langButtons.push(Markup.callbackButton(item.name, JSON.stringify(action)));
  });
  const langKeyboard = Markup.inlineKeyboard(langButtons);
  reply(i18n.t('choose_lang'), langKeyboard.extra());
};


module.exports = langHandler;
