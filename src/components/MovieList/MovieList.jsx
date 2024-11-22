import { useLocation, Link } from 'react-router-dom';
import { MovieCard } from '../MovieCard/MovieCard';

import css from './MovieList.module.css';
export const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={css.movieList}>
      {movies.map(movie => {
        return (
          <li key={movie.id} className={css.movieItem}>
            <Link state={location} to={`/movies/${movie.id}`}>
              <MovieCard movie={movie} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
