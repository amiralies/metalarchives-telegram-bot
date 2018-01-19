const { chatStates } = require('../../../config');
const { searchBand, searchSong } = require('../../helpers/interface');
const { genBandResult, genSongResult } = require('../../helpers/genmessage');

const textHandler = (ctx) => {
  const {
    i18n,
    reply,
    replyWithMarkdown,
    session,
    message,
  } = ctx;

  if (session.chatState === chatStates.AWAITING_BAND_QUERY) {
    session.chatState = chatStates.AWAITING_COMMAND;
    return searchBand(message.text, 0).then((res) => {
      const { msgText, msgKeyboard } = genBandResult(res, ctx);
      return replyWithMarkdown(msgText, msgKeyboard.extra());
    }).then((res) => {
      session.bandSearchQuery = message.text;
      session.bandSearchResultMsgId = res.message_id;
    }).catch((err) => {
      if (err.response && err.response.status === 404) {
        return reply((i18n.t('not_found')));
      }
      console.error(err);
      return reply(i18n.t('error'));
    });
  }
  if (session.chatState === chatStates.AWAITING_SONG_QUERY) {
    session.chatState = chatStates.AWAITING_COMMAND;
    const songQuery = message.text.split('\n');
    const title = songQuery[0] || '';
    const band = songQuery[1] || '';
    return searchSong({ title, band, lyrics: '' }).then((res) => {
      const { msgText, msgKeyboard } = genSongResult(res, ctx);
      return replyWithMarkdown(msgText, msgKeyboard.extra());
    }).then((res) => {
      session.songSearchQuery = message.text;
      session.songSearchResultMsgId = res.message_id;
    }).catch((err) => {
      if (err.response && err.response.status === 404) {
        return reply((i18n.t('not_found')));
      }
      console.error(err);
      return reply(i18n.t('error'));
    });
  }
};

module.exports = textHandler;
