const { Markup } = require('telegraf');

const genBandResult = ({
  startIndex,
  remaining,
  bands,
}, { i18n }) => {
  let msgText = '';
  const bandButtons = [];
  const handleButtons = [];

  bands.forEach((band, i) => {
    msgText = msgText.concat(`___${i + 1}___. ***${band.band_name}*** - (${band.band_genre}) : ___${band.band_country}___\n\n`);
    const getBandAction = `getBand:${band.band_id}`;
    bandButtons.push(Markup.callbackButton((i + 1).toString(), getBandAction, false));
  });

  if (startIndex > 0) {
    const prevAction = `search_band:${startIndex - 5}`;
    const prevButton = Markup.callbackButton(i18n.t('prev'), prevAction, false);
    handleButtons.push(prevButton);
  }
  if (remaining > 0) {
    const nextAction = `search_band:${startIndex + 5}`;
    const nextButton = Markup.callbackButton(i18n.t('next'), nextAction, false);
    handleButtons.push(nextButton);
  }

  const msgKeyboard = Markup.inlineKeyboard([bandButtons, handleButtons]);
  return { msgText, msgKeyboard };
};

module.exports = { genBandResult };
