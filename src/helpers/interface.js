const axios = require('axios');

const { apiUrl } = require('../../config');

const searchSong = (query, startIndex = 0) => new Promise((resolve, reject) => {
  const { title, band, lyrics } = query;
  axios.get(`${apiUrl}/songs?title=${title}&band=${band}&lyrics=${lyrics}&start=${startIndex}&length=5`)
    .then(({ data }) => {
      const { totalResult, currentResult, songs } = data.data;
      const remaining = totalResult - startIndex - 5;
      return resolve({
        totalResult,
        currentResult,
        startIndex,
        remaining,
        songs,
      });
    })
    .catch(err => reject(err));
});

const getLyrics = lyricsId => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/lyrics/${lyricsId}`)
    .then(({ data }) =>
      resolve(data.data.lyrics))
    .catch(err => reject(err));
});

const searchBand = (query, startIndex = 0) => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/bands?name=${query}&start=${startIndex}&length=5`).then(({ data }) => {
    const { totalResult, currentResult, bands } = data.data;
    const remaining = totalResult - startIndex - 5;
    return resolve({
      totalResult,
      currentResult,
      startIndex,
      remaining,
      bands,
    });
  }).catch(err => reject(err));
});

const getBand = bandId => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/bands/${bandId}`)
    .then(({ data }) =>
      resolve(data.data.band))
    .catch(err => reject(err));
});

const getRandomBand = () => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/bands/random`)
    .then(({ data }) =>
      resolve(data.data.band))
    .catch(err => reject(err));
});

const getBandDiscog = bandId => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/bands/${bandId}/discography`)
    .then(({ data }) =>
      resolve(data.data))
    .catch(err => reject(err));
});

const getBandCount = () => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/bands`)
    .then(({ data }) =>
      resolve(data.data.totalResult))
    .catch(err => reject(err));
});

module.exports = {
  searchBand,
  getBand,
  getRandomBand,
  getBandDiscog,
  getBandCount,
  searchSong,
  getLyrics,
};
