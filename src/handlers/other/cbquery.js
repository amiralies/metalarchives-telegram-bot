const cbQueryHandler = (ctx) => {
  const {
    i18n,
    callbackQuery,
    answerCbQuery,
    editMessageText,
  } = ctx;

  if (callbackQuery.data.startsWith('lang:')) {
    const langCode = callbackQuery.data.slice(5);
    i18n.locale(langCode);
    answerCbQuery(i18n.t('lang_name'), false);
    editMessageText(i18n.t('lang_changed'));
  }
};

module.exports = cbQueryHandler;
