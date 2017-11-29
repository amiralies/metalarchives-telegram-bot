const Telegraf = require('telegraf');
const RedisSession = require('telegraf-session-redis');
const TelegrafI18n = require('telegraf-i18n');
const path = require('path');

const handlers = require('./src/handlers');

const bot = new Telegraf(process.env.BOT_TOKEN);
const redisSession = new RedisSession({ store: { host: '127.0.0.1', port: 6379 } });
const telegrafI18n = new TelegrafI18n({
  directory: path.resolve(__dirname, 'config/locales'),
  defaultLanguage: 'en',
  useSession: true,
});

bot.use(redisSession.middleware());
bot.use(telegrafI18n.middleware());

bot.use(handlers.commands, handlers.other);

bot.startPolling();
