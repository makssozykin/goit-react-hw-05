import { Suspense, useState, useEffect, useRef } from 'react';
import { useParams, useLocation, Link, Outlet } from 'react-router-dom';
import {
  fetchMoviesById,
  fetchMoviesCertificationById,
} from '../../services/api';
import { BackLink } from '../../components/BackLink/BackLink';
import css from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState('');
  const [certification, setCertification] = useState('');
  const location = useLocation();
  console.log(location);
  const backLink = useRef(location.state ?? '/movies');
  const defaultImg =
    'https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster';

  useEffect(() => {
    if (!movieId) return;
    const getMovie = async () => {
      const data = await fetchMoviesById(movieId);
      const { results } = await fetchMoviesCertificationById(movieId);
      console.log(results[42]);
      setMovie(data);
      setCertification(results[42]); // Assuming the certification is at index 42
    };
    getMovie();
  }, [movieId]);
  console.log(movie);
  if (!movie) return <h2>Sorry! No Details about Movie!</h2>;
  return (
    <main className={css['main-cont']}>
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
            <h2>{`${movie.title} (${new Date(
              movie.release_date
            ).getFullYear()})`}</h2>
            <ul className={css['movie-short-info']}>
              <li>{certification.release_dates[0].certification}</li>
              <li>
                {new Date(movie.release_date).toLocaleDateString('en-US')}
              </li>
              <li>
                <ul className={css['movie-genres']}>
                  {movie.genres.map(genre => (
                    <li key={genre.id}>{genre.name}</li>
                  ))}
                </ul>
              </li>
              <li>
                {`${Math.floor(movie.runtime / 60)}h ${
                  movie.runtime - Math.floor(movie.runtime / 60) * 60
                }m`}
              </li>
            </ul>
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
                        ? (Math.round(movie.vote_average * 10) / 10).toFixed(1)
                        : Math.round(movie.vote_average * 10) / 10
                    }`
                  : ' NR'
              }`}
            </p>
            <p>User Score</p>
            <h3>Overview</h3>
            <p>{movie.overview}</p>
          </div>
        </div>
        <div className={css['movie-add-info']}>
          <h3>Additional information</h3>
          <ul className={css['movie-add-info-list']}>
            <li>
              <Link to="cast">Cast</Link>
            </li>
            <li>
              <Link to="reviews">Reviews</Link>
            </li>
          </ul>
          <Suspense fallback={<div>Loading page...</div>}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </main>
  );
};

export default MovieDetailsPage;
