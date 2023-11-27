import axios from 'axios';

const API_KEY =
  'live_Wsd22ThtAXBEbnu0AkWYjsB1rwL0rkIQZuD3pWx0eZ3Ki0NR1BtimSmQlvKVrCix';

const BASE_URL = 'https://api.thecatapi.com/v1';

const api = axios.create({
  baseURL: 'https://api.thecatapi.com/v1/',
  timeout: 2000,
  headers: { 'x-api-key': API_KEY },
});

export function fetchBreeds(url) {
  return api.get(url);
}

export function fetchCatByBreed(breedId) {
  const URL = 'images/search';
  return api.get(URL, {
    params: {
      breed_ids: breedId,
    },
  });
}
