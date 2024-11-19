import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const API_KEY = '6226696e268f9f727edb13ca3fd5e392';

export const fetchTrendMovies = async () => {
  const { data } = await axios.get(`trending/movie/day?api_key=${API_KEY}`);

  return data.results;
};

export const fetchTrendMoviesById = async movieId => {
  const { data } = await axios.get(
    `movie/${movieId}?api_key=${API_KEY}&language=en-US`
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
    `movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US`
  );

  return data;
};
