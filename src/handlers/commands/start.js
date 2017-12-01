const { chatStates } = require('../../../config');

const startHandler = ({ i18n, reply, session }) => {
  session.chatState = chatStates.AWAITING_COMMAND;
  reply(i18n.t('start'));
};

module.exports = startHandler;
