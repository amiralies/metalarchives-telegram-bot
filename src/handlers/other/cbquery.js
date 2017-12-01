const cbQueryHandler = (ctx) => {
  const {
    i18n,
    callbackQuery,
    answerCbQuery,
    editMessageText,
  } = ctx;

  const action = JSON.parse(callbackQuery.data);

  switch (action.type) {
    case 'language_change': {
      const { langCode } = action.payload;
      i18n.locale(langCode);
      answerCbQuery(i18n.t('lang_name'), false);
      editMessageText(i18n.t('lang_changed'));
    }
      break;
    default:
  }
};

module.exports = cbQueryHandler;

