const { chatStates } = require('../../../config');
const { getBandCount } = require('../../helpers/interface');

const bandcountHandler = (({ i18n, reply, session }) => {
  session.chatState = chatStates.AWAITING_COMMAND;
  getBandCount()
    .then((res) => { reply(res.toString()); })
    .catch((err) => {
      console.error(err);
      reply(i18n.t('error'));
    });
});

module.exports = bandcountHandler;
