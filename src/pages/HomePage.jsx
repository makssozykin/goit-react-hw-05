import { useState, useEffect } from 'react';
import { MovieList } from '../components/MovieList/MovieList';
import { fetchTrendMovies } from '../services/api';
export const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchTrendMovies().then(setMovies);
  }, []);

  return (
    <main>
      <h2>Trending today</h2>
      <MovieList movies={movies} />
    </main>
  );
};
