const { chatStates } = require('../../../config');

const aboudHandler = ({ i18n, replyWithMarkdown, session }) => {
  session.chatState = chatStates.AWAITING_COMMAND;
  replyWithMarkdown(i18n.t('about'));
};

module.exports = aboudHandler;
