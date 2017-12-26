const { getBandCount } = require('../../helpers/interface');

const bandcountHandler = (({ i18n, reply }) => {
  getBandCount()
    .then((res) => { reply(res.toString()); })
    .catch((err) => {
      console.error(err);
      reply(i18n.t('error'));
    });
});

module.exports = bandcountHandler;
