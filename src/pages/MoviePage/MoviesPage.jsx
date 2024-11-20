import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { MovieList } from '../../components/MovieList/MovieList';
import { fetchMovies } from '../../services/api';
import css from './MoviePage.module.css';
const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [queryParams, setQueryParams] = useSearchParams();
  useEffect(() => {
    const query = queryParams.get('query') ?? '';
    if (!query) return;
    const getData = async () => {
      try {
        const data = await fetchMovies(query);
        const voteSort = data.sort(
          (firstMovie, secondMovie) =>
            secondMovie.vote_average - firstMovie.vote_average
        );
        setMovies(voteSort);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [queryParams]);

  const handleSetQuery = newValue => {
    queryParams.set('query', newValue);
    setQueryParams(queryParams);
  };
  return (
    <main className={css['main-cont']}>
      <SearchBar setQueryParams={handleSetQuery} />
      {movies.length > 0 && <MovieList movies={movies} />}
      <Toaster position="top-right" reverseOrder={false} />
    </main>
  );
};

export default MoviesPage;
