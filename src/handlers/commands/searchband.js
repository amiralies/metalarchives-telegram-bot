const { chatStates } = require('../../../config');

const searchbandHandler = ({ i18n, replyWithMarkdown, session }) => {
  session.chatState = chatStates.AWAITING_BAND_NAME;
  replyWithMarkdown(i18n.t('search_band'));
};

module.exports = searchbandHandler;
