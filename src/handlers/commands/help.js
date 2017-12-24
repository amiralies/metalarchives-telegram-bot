const helpHandler = ({ i18n, replyWithMarkdown }) => {
  replyWithMarkdown(i18n.t('help'));
};

module.exports = helpHandler;
