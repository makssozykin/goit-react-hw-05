import { useState, useEffect } from 'react';
import { MovieList } from '../../components/MovieList/MovieList';
import { fetchTrendMovies } from '../../services/api';
import ChooseDate from '../../components/ChooseDate/ChooseDate';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import css from './HomePage.module.css';
const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [date, setDate] = useState('day');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleDateChange = evt => {
    setDate(evt.target.value);
  };

  useEffect(() => {
    const getMovies = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchTrendMovies(date);
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
    getMovies();
  }, [date]);

  return (
    <main className={css['main-cont']}>
      <div className={css.trendOptions}>
        <h2>Trending</h2>
        <ChooseDate value={date} handleDateChange={handleDateChange} />
      </div>
      {isLoading && <Loader />}
      <MovieList movies={movies} />
      {error && <ErrorMessage />}
    </main>
  );
};

export default HomePage;
