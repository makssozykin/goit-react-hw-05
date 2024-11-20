import { Suspense, useState, useEffect, useRef } from 'react';
import { useParams, useLocation, Link, Outlet } from 'react-router-dom';
import { fetchMoviesById } from '../services/api';
import { BackLink } from '../components/BackLink/BackLink';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState('');
  const location = useLocation();
  console.log(location);
  const backLink = useRef(location.state ?? '/movies');
  const defaultImg =
    'https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster';

  useEffect(() => {
    if (!movieId) return;
    const getMovie = async () => {
      const data = await fetchMoviesById(movieId);
      setMovie(data);
    };
    getMovie();
  }, [movieId]);

  if (!movie) return <h2>Sorry! No Details about Movie!</h2>;
  return (
    <ma>
      <BackLink to={backLink.current}>Back to Movies</BackLink>
      <div>
        <div>
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : defaultImg
            }
            width={250}
            alt={movie.title}
          />
        </div>
        <div>
          <h2>{movie.title}</h2>
          <p>
            User Score:
            {movie.vote_average > 0
              ? ` ${Math.round(movie.vote_average * 10)}%`
              : ' NR'}
          </p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h4>Genres</h4>
          <ul>
            {movie.genres.map(genre => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Additional information</h3>
          <ul>
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
    </ma>
  );
};

export default MovieDetailsPage;
