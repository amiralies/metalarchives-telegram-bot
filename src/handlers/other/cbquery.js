const { searchBand, getBand } = require('../../helpers/interface');
const { genBandResult, genBandInfo } = require('../../helpers/genmessage');
const { Extra } = require('telegraf');

const cbQueryHandler = (ctx) => {
  const {
    i18n,
    callbackQuery,
    answerCbQuery,
    editMessageText,
    reply,
    replyWithMarkdown,
    session,
  } = ctx;
  const { data, message } = callbackQuery;

  if (data.startsWith('lang:')) {
    const langCode = data.slice(5);
    i18n.locale(langCode);
    answerCbQuery(i18n.t('lang_name'), false);
    editMessageText(i18n.t('lang_changed'));
  }

  if (data.startsWith('search_band:')) {
    const startIndex = Number(data.slice(12));
    const { searchQuery, searchResultMsgId } = session;
    if (searchResultMsgId === message.message_id) {
      searchBand(searchQuery, startIndex).then((res) => {
        const { msgText, msgKeyboard } = genBandResult(res, ctx);
        editMessageText(msgText, Extra.markup(msgKeyboard).markdown());
      }).catch((err) => {
        console.error(err);
        reply(i18n.t('error'));
      });
    } else {
      answerCbQuery(i18n.t('its_old'), false);
    }
  }

  if (data.startsWith('getBand:')) {
    const bandId = Number(data.slice(8));
    answerCbQuery();
    getBand(bandId).then((res) => {
      const bandInfo = genBandInfo(res);
      replyWithMarkdown(bandInfo);
    }).catch((err) => {
      console.error(err);
      reply(i18n.t('error'));
    });
  }
};

module.exports = cbQueryHandler;

