const { chatStates } = require('../../../config');
const { getBand } = require('../../helpers/interface');
const { genBandInfo } = require('../../helpers/genmessage');
const { incUserRequests, incBandRequests } = require('../../helpers/utils');

const startHandler = (ctx) => {
  const {
    i18n,
    reply,
    replyWithMarkdown,
    session,
    message,
    from,
  } = ctx;
  session.chatState = chatStates.AWAITING_COMMAND;

  const data = message.text.slice(7);
  if (data.startsWith('getBand_')) {
    const bandId = Number(data.slice(8));
    incUserRequests(from);
    getBand(bandId).then((res) => {
      incBandRequests(res);
      const { msgText, msgKeyboard } = genBandInfo(res, ctx);
      replyWithMarkdown(msgText, msgKeyboard.extra());
    }).catch((err) => {
      console.error(err);
      reply(i18n.t('error'));
    });
  } else if (data.startsWith('notfound')) {
    reply(i18n.t('not_found'));
  } else reply(i18n.t('start'));
};

module.exports = startHandler;
