import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { SearchBar } from '../components/SearchBar/SearchBar';
import { MovieList } from '../components/MovieList/MovieList';
import { fetchMovies } from '../services/api';
export const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  useEffect(() => {
    if (query === '') return;
    const getData = async () => {
      try {
        const { results } = await fetchMovies(query);

        setMovies(prevMovies => [...prevMovies, ...results]);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [query]);

  const handleSubmitQuery = query => {
    setQuery(query);
  };
  return (
    <header>
      <SearchBar onSubmit={handleSubmitQuery} />
      <MovieList movies={movies} />
      <Toaster position="top-right" reverseOrder={false} />
    </header>
  );
};
