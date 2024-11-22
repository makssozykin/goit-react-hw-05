import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { MovieList } from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { fetchMovies } from '../../services/api';
import css from './MoviesPage.module.css';
const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [queryParams, setQueryParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const query = queryParams.get('query') ?? '';
    if (!query) return;
    const getData = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMovies(query);
        const voteSort = data.sort(
          (firstMovie, secondMovie) =>
            secondMovie.vote_average - firstMovie.vote_average
        );
        setMovies(voteSort);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
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
      {isLoading && <Loader />}
      {movies.length > 0 && !isLoading && !error && (
        <MovieList movies={movies} />
      )}
      {error && <ErrorMessage />}
      <Toaster position="top-right" reverseOrder={false} />
    </main>
  );
};

export default MoviesPage;
