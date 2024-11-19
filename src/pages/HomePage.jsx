import { useState, useEffect } from 'react';
import { MovieList } from '../components/MovieList/MovieList';
import { fetchTrendMovies } from '../services/api';
import ChooseDate from '../components/ChooseDate/ChooseDate';
export const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [date, setDate] = useState('day');

  const handleDateChange = evt => {
    setDate(evt.target.value);
  };

  useEffect(() => {
    const getMovies = async () => {
      const data = await fetchTrendMovies(date);
      const voteSort = data.sort(
        (firstMovie, secondMovie) =>
          secondMovie.vote_average - firstMovie.vote_average
      );
      setMovies(voteSort);
    };
    getMovies();
  }, [date]);

  return (
    <main>
      <h2>Trending Movies</h2>
      <ChooseDate value={date} handleDateChange={handleDateChange} />

      <MovieList movies={movies} />
    </main>
  );
};
