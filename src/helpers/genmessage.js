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
  const discogButton = Markup.callbackButton(i18n.t('discography'), `getBandDiscog:${id}`, false);
  buttons.push([photoButton, logoButton], [discogButton]);
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

const genBandDiscog = ({ discography }) => {
  let msgText = '';
  const msgTexts = [];
  discography.forEach(({ name, type, year }) => {
    if (type === 'Full-length') {
      msgText = msgText.concat(`***${name} - (${type}) - ${year}***\n\n`);
    } else msgText = msgText.concat(`${name} - (${type}) - ${year}\n\n`);
  });

  // it checks if msg length is more than 4096 then split it into around 3500 length characters
  if (msgText.length > 4096) {
    let lastIndex = 0;
    let breakPoint = 0;
    let totalMsgLength = 0;
    for (let i = 0; i < msgText.length; i += 1) {
      breakPoint += 1;
      if (breakPoint > 3500) {
        if (msgText.substr(i, 2) === '\n\n') {
          breakPoint = 0;
          msgTexts.push(msgText.slice(lastIndex, i));
          totalMsgLength += i - lastIndex;
          lastIndex = i;
        }
      }
    }
    if (totalMsgLength < msgText.length) {
      msgTexts.push(msgText.slice(lastIndex, msgText.length));
    }
  } else msgTexts.push(msgText);
  return { msgTexts };
};

module.exports = {
  genBandResult,
  genBandInfo,
  genBandPhoto,
  genBandLogo,
  genBandDiscog,
};
