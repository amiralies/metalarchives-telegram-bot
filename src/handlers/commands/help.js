const { chatStates } = require('../../../config');

const helpHandler = ({ i18n, replyWithMarkdown, session }) => {
  session.chatState = chatStates.AWAITING_COMMAND;
  replyWithMarkdown(i18n.t('help'));
};

module.exports = helpHandler;
