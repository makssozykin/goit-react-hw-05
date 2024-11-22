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
  const [country, setCountry] = useState('');

  const location = useLocation();
  const backLink = useRef(location.state ?? '/movies');

  const defaultImg =
    'https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster';

  useEffect(() => {
    if (!movieId) return;
    const getMovie = async () => {
      try {
        const data = await fetchMoviesById(movieId);
        const { results } = await fetchMoviesCertificationById(movieId);
        console.log(results);
        const ageArr = results
          .filter(
            result => result.iso_3166_1 === 'UA' || result.iso_3166_1 === 'US'
          )
          .filter(result => {
            if (
              result.iso_3166_1 === 'UA' &&
              result.release_dates[0].certification !== ''
            ) {
              return result.release_dates[0].certification;
            } else if (
              result.iso_3166_1 === 'US' &&
              result.release_dates[0].certification !== ''
            ) {
              return result.release_dates[0].certification;
            } else if (
              result.iso_3166_1 === 'US' &&
              result.release_dates[1].certification !== ''
            ) {
              return result.release_dates[1].certification;
            } else if (
              result.iso_3166_1 === 'US' &&
              result.release_dates[0].certification === ''
            ) {
              return (result.iso_3166_1 =
                data.origin_country &&
                result.release_dates[0].certification === <s>NA</s>);
            }
          });
        console.log(ageArr);
        const age =
          ageArr.length === 0 ? (
            <s>NA</s>
          ) : ageArr[0].release_dates[0].certification !== '' ? (
            ageArr[0].release_dates[0].certification
          ) : ageArr[0].release_dates[1].certification === '' ? (
            <s>NA</s>
          ) : (
            ageArr[0].release_dates[1].certification
          );

        const countryName =
          ageArr.length === 0 ? data.origin_country : ageArr[0].iso_3166_1;

        setMovie(data);
        setCertification(age);
        setCountry(countryName);
      } catch (error) {
        console.log('Error:', error);
      }
    };
    getMovie();
  }, [movieId]);

  return !movie ? (
    <main className={css['main-cont']}>
      <BackLink to={backLink.current}>Go Back</BackLink>
      <h2>Sorry! No Details about Movie!</h2>
    </main>
  ) : (
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
            <h2 className={css['movie-title']}>{`${movie.title} (${new Date(
              movie.release_date
            ).getFullYear()})`}</h2>
            <ul className={css['movie-short-info']}>
              <li>
                <span className={css.certification}>{certification}</span>{' '}
                <span>
                  {new Date(movie.release_date).toLocaleDateString('en-US')}
                </span>{' '}
                <span>({country})</span>
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
    </main>
  );
};

export default MovieDetailsPage;
