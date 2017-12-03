const { searchBand, getBand, getBandDiscog } = require('../../helpers/interface');
const {
  genBandResult,
  genBandInfo,
  genBandPhoto,
  genBandLogo,
  genBandDiscog,
} = require('../../helpers/genmessage');
const { Extra } = require('telegraf');

const cbQueryHandler = (ctx) => {
  const {
    i18n,
    callbackQuery,
    answerCbQuery,
    editMessageText,
    reply,
    replyWithMarkdown,
    replyWithPhoto,
    replyWithDocument,
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
      const { msgText, msgKeyboard } = genBandInfo(res, ctx);
      replyWithMarkdown(msgText, msgKeyboard.extra());
    }).catch((err) => {
      console.error(err);
      reply(i18n.t('error'));
    });
  }

  if (data.startsWith('getBandPhoto:')) {
    const bandId = Number(data.slice(13));
    answerCbQuery();
    getBand(bandId).then((res) => {
      const { msgPhoto, msgCaption } = genBandPhoto(res);
      const extra = Extra.inReplyTo(message.message_id);
      extra.caption = msgCaption;
      replyWithPhoto(msgPhoto, extra);
    }).catch((err) => {
      console.error(err);
      reply(i18n.t('error'));
    });
  }

  if (data.startsWith('getBandLogo:')) {
    const bandId = Number(data.slice(12));
    answerCbQuery();
    getBand(bandId).then((res) => {
      const { msgPhoto, msgCaption } = genBandLogo(res);
      const extra = Extra.inReplyTo(message.message_id);
      extra.caption = msgCaption;
      replyWithDocument(msgPhoto, extra);
    }).catch((err) => {
      console.error(err);
      reply(i18n.t('error'));
    });
  }

  if (data.startsWith('getBandDiscog:')) {
    const bandId = Number(data.slice(14));
    answerCbQuery();
    getBandDiscog(bandId).then((res) => {
      const { msgTexts } = genBandDiscog(res);
      const extra = Extra.inReplyTo(message.message_id);
      msgTexts.forEach((msgText) => {
        replyWithMarkdown(msgText, extra);
      });
    }).catch((err) => {
      console.error(err);
      reply(i18n.t('error'));
    });
  }
};

module.exports = cbQueryHandler;

