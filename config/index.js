const {
  MONGO_URL,
  REDIS_URL,
  API_URL,
  BOT_TOKEN,
  BOT_USERNAME,
  LOCAL_SESSION,
} = process.env;

module.exports = {
  mongoUrl: MONGO_URL || 'mongodb://localhost:27017/metalarchives-bot',
  redisUrl: REDIS_URL || 'redis://localhost:6379',
  apiUrl: API_URL || 'http://localhost:3000',
  botToken: BOT_TOKEN,
  botUsername: BOT_USERNAME,
  useLocalSession: (LOCAL_SESSION === 'true'),
  chatStates: {
    AWAITING_COMMAND: 'AWAITING_COMMAND',
    AWAITING_BAND_QUERY: 'AWAITING_BAND_QUERY',
    AWAITING_SONG_QUERY: 'AWAITING_SONG_QUERY',
  },
};
