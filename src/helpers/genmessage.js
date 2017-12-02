const { Markup } = require('telegraf');
const { normalizeLogoUrl } = require('../helpers/utils');

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

const genBandInfo = (band, { i18n }) => {
  const {
    id,
    name,
    genre,
    country,
    location,
    themes,
    status,
    label,
    formYear,
    yearsActive,
  } = band;

  let msgText = `***${name}***\n`;
  msgText += `${'='.repeat(name.length)}\n\n`;
  msgText += `Genre: ***${genre}***\n\n`;
  msgText += `Country: ***${country}***\n\n`;
  msgText += `Location: ***${location}***\n\n`;
  msgText += `Themes: ***${themes}***\n\n`;
  msgText += `Status: ***${status}***\n\n`;
  msgText += `Label: ***${label}***\n\n`;
  msgText += `Formed in: ***${formYear}***\n\n`;
  msgText += `Years active: ***${yearsActive}***`;

  const buttons = [];
  const photoButton = Markup.callbackButton(i18n.t('photo'), `getBandPhoto:${id}`, false);
  const logoButton = Markup.callbackButton(i18n.t('logo'), `getBandLogo:${id}`, false);
  buttons.push(photoButton, logoButton);
  const msgKeyboard = Markup.inlineKeyboard(buttons);

  return { msgText, msgKeyboard };
};

const genBandPhoto = ({ photoUrl, name }) => {
  const msgPhoto = photoUrl;
  const msgCaption = name;
  return ({ msgPhoto, msgCaption });
};

const genBandLogo = ({ logoUrl, name }) => {
  const msgPhoto = normalizeLogoUrl(logoUrl);
  const msgCaption = name;
  return ({ msgPhoto, msgCaption });
};

module.exports = {
  genBandResult,
  genBandInfo,
  genBandPhoto,
  genBandLogo,
};
