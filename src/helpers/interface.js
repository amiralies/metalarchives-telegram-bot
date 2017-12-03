const axios = require('axios');

const { API_URL } = require('../../config');

const searchBand = (query, startIndex = 0) => new Promise((resolve, reject) => {
  axios.get(`${API_URL}/bands?name=${query}&start=${startIndex}&length=5`).then(({ data }) => {
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
  axios.get(`${API_URL}/bands/${bandId}`)
    .then(({ data }) =>
      resolve(data.data.band))
    .catch(err => reject(err));
});

const getBandDiscog = bandId => new Promise((resolve, reject) => {
  axios.get(`${API_URL}/bands/${bandId}/discography`)
    .then(({ data }) =>
      resolve(data.data))
    .catch(err => reject(err));
});

module.exports = { searchBand, getBand, getBandDiscog };
