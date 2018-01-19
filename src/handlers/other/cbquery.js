const {
  searchSong,
  searchBand,
  getBand,
  getBandDiscog,
  getLyrics,
} = require('../../helpers/interface');
const {
  genBandResult,
  genBandInfo,
  genBandPhoto,
  genBandLogo,
  genBandDiscog,
  genSongResult,
} = require('../../helpers/genmessage');
const { incUserRequests, incBandRequests } = require('../../helpers/utils');
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
    from,
  } = ctx;
  const { data, message } = callbackQuery;

  if (data.startsWith('lang:')) {
    const langCode = data.slice(5);
    i18n.locale(langCode);
    answerCbQuery(i18n.t('lang_name'), false);
    editMessageText(i18n.t('lang_changed'));
  }

  if (data.startsWith('search_song:')) {
    const startIndex = Number(data.slice(12));
    const { songSearchQuery, songSearchResultMsgId } = session;
    if (songSearchResultMsgId === message.message_id) {
      const songQuery = songSearchQuery.split('\n');
      const title = songQuery[0] || '';
      const band = songQuery[1] || '';
      searchSong({ title, band, lyrics: '' }, startIndex).then((res) => {
        const { msgText, msgKeyboard } = genSongResult(res, ctx);
        editMessageText(msgText, Extra.markup(msgKeyboard).markdown());
      }).catch((err) => {
        console.error(err);
        reply(i18n.t('error'));
      });
    } else {
      answerCbQuery(i18n.t('its_old'), false);
    }
  }

  if (data.startsWith('getLyrics:')) {
    const lyricsId = Number(data.slice(10));
    incUserRequests(from);
    answerCbQuery();
    getLyrics(lyricsId).then((res) => {
      if (res.startsWith('(lyrics not available)')) {
        replyWithMarkdown(i18n.t('lyrics_not_available'), Extra.inReplyTo(message.message_id));
      } else replyWithMarkdown(res, Extra.inReplyTo(message.message_id));
    }).catch((err) => {
      console.error(err);
      reply(i18n.t('error'));
    });
  }

  if (data.startsWith('search_band:')) {
    const startIndex = Number(data.slice(12));
    const { bandSearchQuery, bandSearchResultMsgId } = session;
    if (bandSearchResultMsgId === message.message_id) {
      searchBand(bandSearchQuery, startIndex).then((res) => {
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
    incUserRequests(from);
    answerCbQuery();
    getBand(bandId).then((res) => {
      incBandRequests(res);
      const { msgText, msgKeyboard } = genBandInfo(res, ctx);
      replyWithMarkdown(msgText, msgKeyboard.extra());
    }).catch((err) => {
      console.error(err);
      reply(i18n.t('error'));
    });
  }

  if (data.startsWith('getBandPhoto:')) {
    const bandId = Number(data.slice(13));
    incUserRequests(from);
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
    incUserRequests(from);
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
    incUserRequests(from);
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
