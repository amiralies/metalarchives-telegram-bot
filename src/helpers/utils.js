const normalizeLogoUrl = (logoUrl) => {
  const n = logoUrl.indexOf('?');
  logoUrl = logoUrl.substring(0, n !== -1 ? n : logoUrl.length);
  return logoUrl;
};

module.exports = { normalizeLogoUrl };
