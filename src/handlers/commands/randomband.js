const { chatStates } = require('../../../config');
const { getRandomBand } = require('../../helpers/interface');
const { genBandInfo } = require('../../helpers/genmessage');
const { incUserRequests } = require('../../helpers/utils');

const randombandHandler = (ctx) => {
  const {
    from,
    reply,
    replyWithMarkdown,
    i18n,
    session,
  } = ctx;
  session.chatState = chatStates.AWAITING_COMMAND;
  incUserRequests(from);
  getRandomBand().then((res) => {
    const { msgText, msgKeyboard } = genBandInfo(res, ctx);
    replyWithMarkdown(msgText, msgKeyboard.extra());
  }).catch((err) => {
    console.error(err);
    reply(i18n.t('error'));
  });
};

module.exports = randombandHandler;
