const { chatStates } = require('../../../config');
const { searchBand } = require('../../helpers/interface');
const { genBandResult } = require('../../helpers/genmessage');

const textHandler = (ctx) => {
  const {
    i18n,
    reply,
    replyWithMarkdown,
    session,
    message,
  } = ctx;

  switch (session.chatState) {
    case chatStates.AWAITING_BAND_NAME:
      session.chatState = chatStates.AWAITING_COMMAND;
      return searchBand(message.text, 0).then((res) => {
        const { msgText, msgKeyboard } = genBandResult(res, ctx);
        return replyWithMarkdown(msgText, msgKeyboard.extra());
      }).then((res) => {
        session.searchQuery = message.text;
        session.searchResultMsgId = res.message_id;
      }).catch((err) => {
        if (err.response && err.response.status === 404) {
          return reply((i18n.t('not_found')));
        }
        console.error(err);
        return reply(i18n.t('error'));
      });
    default:
  }
};

module.exports = textHandler;
