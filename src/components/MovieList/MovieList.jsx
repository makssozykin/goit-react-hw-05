import { useLocation, Link } from 'react-router-dom';
import css from './MovieList.module.css';
export const MovieList = ({ movies }) => {
  const location = useLocation();
  const defaultImg =
    'https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster';

  return (
    <ul className={css.movieList}>
      {movies.map(movie => {
        return (
          <li key={movie.id} className={css.movieItem}>
            <Link state={location} to={`/movies/${movie.id}`}>
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                    : defaultImg
                }
                width={200}
                alt={movie.title}
              />
              <p className={css['movie-title']}>{movie.title} </p>
              <p className={css.score}>{`${
                movie.vote_average > 0
                  ? ` ${Math.round(movie.vote_average * 10) / 10}/10`
                  : ' NR'
              }`}</p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

// {
//   `${movie.title} - score ${
//     movie.vote_average > 0 ? ` ${Math.round(movie.vote_average * 10)}%` : ' NR'
//   }`;
// }
