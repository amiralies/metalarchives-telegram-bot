const { Markup } = require('telegraf');
const { searchBand } = require('../../helpers/interface');

const inlineQueryHandler = ({ inlineQuery, answerInlineQuery, me }) => {
  const offset = parseInt(inlineQuery.offset, 10) || 0;
  searchBand(inlineQuery.query, offset)
    .then((data) => {
      /* eslint-disable camelcase */
      const results = data.bands.map((band) => {
        const {
          band_id,
          band_name,
          band_country,
          band_genre,
        } = band;
        const msgText = `*${band_name}*\nGenre: *${band_genre}*\nCountry: *${band_country}*`;
        const msgButton = Markup.urlButton(`More about ${band_name}`, `https://telegram.me/${me}?start=getBand_${band_id}`, false);
        return {
          type: 'article',
          id: band_id,
          title: band_name,
          description: `(${band_genre}) : ${band_country}`,
          input_message_content: { message_text: msgText, parse_mode: 'Markdown' },
          reply_markup: Markup.inlineKeyboard([msgButton]),
        };
      });
      /* eslint-enable camelcase */
      answerInlineQuery(results, { next_offset: offset + 5 });
    })
    .catch((err) => {
      if (err.response.status === 404) {
        answerInlineQuery([], {
          switch_pm_text: 'Nothing found :(',
          switch_pm_parameter: 'notfound',
        });
      } else if (!err.response.status.toString().startsWith('4')) {
        console.error(err);
      }
    });
};

module.exports = inlineQueryHandler;
