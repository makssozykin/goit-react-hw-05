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
                    ? `https://image.tmdb.org/t/p/w780/${movie.poster_path}`
                    : defaultImg
                }
                alt={movie.title}
              />
              <p className={css['movie-title']}>{movie.title} </p>
              <p className={css.score}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  className={css['ipc - icon']}
                  viewBox="0 0 24 24"
                  role="presentation"
                >
                  <path d="M12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"></path>
                </svg>
                {`${
                  movie.vote_average > 0
                    ? ` ${
                        movie.vote_average % movie.vote_average === 0
                          ? (Math.round(movie.vote_average * 10) / 10).toFixed(
                              1
                            )
                          : Math.round(movie.vote_average * 10) / 10
                      }`
                    : ' NR'
                }`}
              </p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
