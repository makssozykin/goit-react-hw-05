import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { SearchBar } from '../components/SearchBar/SearchBar';
import { MovieList } from '../components/MovieList/MovieList';
import { fetchMovies } from '../services/api';
const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [queryParams, setQueryParams] = useSearchParams();
  useEffect(() => {
    const query = queryParams.get('query');
    if (!query) return;
    const getData = async () => {
      try {
        const data = await fetchMovies(query);

        setMovies(data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [queryParams]);

  // const handleSubmitQuery = query => {
  //   setMovies([]);
  //   setQueryParams(query);
  // };
  return (
    <header>
      <SearchBar setQueryParams={setQueryParams} />
      {movies.length > 0 && <MovieList movies={movies} />}
      <Toaster position="top-right" reverseOrder={false} />
    </header>
  );
};

export default MoviesPage;
