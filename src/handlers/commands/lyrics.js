const { chatStates } = require('../../../config');

const lyricsHandler = ({ i18n, replyWithMarkdown, session }) => {
  session.chatState = chatStates.AWAITING_SONG_QUERY;
  replyWithMarkdown(i18n.t('search_song'));
};

module.exports = lyricsHandler;
