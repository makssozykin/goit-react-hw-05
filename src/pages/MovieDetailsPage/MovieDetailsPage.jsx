import { Suspense, useState, useEffect, useRef } from 'react';
import { useParams, useLocation, Link, Outlet } from 'react-router-dom';
import { fetchMoviesById } from '../../services/api';
import { BackLink } from '../../components/BackLink/BackLink';
import { Certification } from '../../components/Certification/Certification';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import css from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState('');

  const location = useLocation();
  const backLink = useRef(location.state ?? '/movies');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const defaultImg =
    'https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster';

  useEffect(() => {
    if (!movieId) return;
    const getMovie = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMoviesById(movieId);

        setMovie(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getMovie();
  }, [movieId]);

  return !movie ? (
    <main className={css['main-cont']}>
      {isLoading && <Loader />}
      <BackLink to={backLink.current}>Go Back</BackLink>
      <h2>Sorry! No Details about Movie!</h2>
    </main>
  ) : (
    <main className={css['main-cont']}>
      {isLoading && <Loader />}
      <BackLink to={backLink.current}>Go Back</BackLink>
      <div className={css['movie-container']}>
        <div className={css['movie-content']}>
          <div className={css['movie-poster']}>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : defaultImg
              }
              alt={movie.title}
            />
          </div>
          <div>
            <h2 className={css['movie-title']}>{`${movie.title} (${new Date(
              movie.release_date
            ).getFullYear()})`}</h2>
            <ul className={css['movie-short-info']}>
              <li>
                <Certification>
                  {new Date(movie.release_date).toLocaleDateString('en-US')}
                </Certification>
              </li>
              <li>
                {movie.genres.length === 0
                  ? 'no genres'
                  : movie.genres.map(genre => genre.name).join(', ')}
              </li>
              <li>
                {`${Math.floor(movie.runtime / 60)}h ${
                  movie.runtime - Math.floor(movie.runtime / 60) * 60
                }m`}
              </li>
            </ul>

            <div className={css['user-score']}>
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
              <p>User Score</p>
            </div>
            <div className={css['movie-overview']}>
              <h3 className={css['overview-title']}>Overview</h3>
              <p className={css['overview-text']}>{movie.overview}</p>
            </div>
          </div>
        </div>
        <div className={css['movie-add-info']}>
          <h3>Additional information</h3>
          <ul className={css['movie-add-info-list']}>
            <li className={css['movie-add-info-item']}>
              <Link to="cast">Cast</Link>
            </li>
            <li className={css['movie-add-info-item']}>
              <Link to="reviews">Reviews</Link>
            </li>
          </ul>
          <Suspense fallback={<div>Loading page...</div>}>
            <Outlet />
          </Suspense>
        </div>
      </div>
      {error && <ErrorMessage />}
    </main>
  );
};

export default MovieDetailsPage;
