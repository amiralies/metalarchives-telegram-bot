const {
  DB_HOST,
  DB_PORT,
  REDIS_HOST,
  REDIS_PORT,
  API_URL,
} = process.env;

module.exports = {
  DB_CONNECTION_STRING: `mongodb://${DB_HOST}:${DB_PORT}/metalarchives-bot`,
  REDIS_HOST,
  REDIS_PORT,
  API_URL: `http://${API_URL}`,
  chatStates: {
    AWAITING_COMMAND: 'AWAITING_COMMAND',
    AWAITING_BAND_QUERY: 'AWAITING_BAND_QUERY',
  },
};
