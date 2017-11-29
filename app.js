const Telegraf = require('telegraf');
const Markup = require('telegraf/markup');
const RedisSession = require('telegraf-session-redis');
const TelegrafI18n = require('telegraf-i18n');
const path = require('path');

const languages = require('./config/languages.json');


const bot = new Telegraf(process.env.BOT_TOKEN);
const redisSession = new RedisSession({ store: { host: '127.0.0.1', port: 6379 } });
const telegrafI18n = new TelegrafI18n({
  directory: path.resolve(__dirname, 'config/locales'),
  defaultLanguage: 'en',
  useSession: true,
});


bot.use(redisSession.middleware());
bot.use(telegrafI18n.middleware());


bot.start(({ i18n, reply }) => {
  reply(i18n.t('start'));
});
bot.command('help', ({ i18n, reply }) => {
  reply(i18n.t('help'));
});

bot.command('lang', ({ i18n, reply }) => {
  const langButtons = [];
  languages.forEach((item) => {
    langButtons.push(Markup.callbackButton(item.name, `lang:${item.code}`));
  });
  const langKeyboard = Markup.inlineKeyboard(langButtons);
  reply(i18n.t('choose_lang'), langKeyboard.extra());
});

bot.on('callback_query', (ctx) => {
  const {
    i18n,
    callbackQuery,
    answerCbQuery,
    editMessageText,
  } = ctx;

  if (callbackQuery.data.startsWith('lang:')) {
    const langCode = callbackQuery.data.slice(5);
    i18n.locale(langCode);
    answerCbQuery(i18n.t('lang_name'), false);
    editMessageText(i18n.t('lang_changed'));
  }
});


bot.startPolling();
