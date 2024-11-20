import { useState, useEffect } from 'react';
import { MovieList } from '../../components/MovieList/MovieList';
import { fetchTrendMovies } from '../../services/api';
import ChooseDate from '../../components/ChooseDate/ChooseDate';
import css from './HomePage.module.css';
const HomePage = () => {
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
    <main className={css['main-cont']}>
      <div className={css.trendOptions}>
        <h2>Trending</h2>
        <ChooseDate value={date} handleDateChange={handleDateChange} />
      </div>
      <MovieList movies={movies} />
    </main>
  );
};

export default HomePage;
