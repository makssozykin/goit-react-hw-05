import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const API_KEY = '6226696e268f9f727edb13ca3fd5e392';

export const fetchTrendMovies = async date => {
  const { data } = await axios.get(`trending/movie/${date}?api_key=${API_KEY}`);

  return data.results;
};

export const fetchMoviesById = async movieId => {
  const { data } = await axios.get(
    `movie/${movieId}?api_key=${API_KEY}&language=en-US`
  );

  return data;
};

export const fetchMoviesCertificationById = async movieId => {
  const { data } = await axios.get(
    `movie/${movieId}/release_dates?api_key=${API_KEY}`
  );

  return data;
};

export const fetchMovieCreditsById = async movieId => {
  const { data } = await axios.get(
    `movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
  );

  return data;
};

export const fetchMovieReviewsById = async movieId => {
  const { data } = await axios.get(
    `movie/${movieId}/reviews?api_key=${API_KEY}&include_adult=true&language=en-US`
  );

  return data;
};

export const fetchMovies = async query => {
  const { data } = await axios.get(
    `search/movie?api_key=${API_KEY}&query=${query}&include_adult=true&language=en-US&page=1`
  );
  return data.results;
};

export const fetchMoviesCertification = async query => {
  const { data } = await axios.get(
    `search/movie?api_key=${API_KEY}&query=${query}&include_adult=true&language=en-US&page=1`
  );
  return data.results;
};
