import { useState, useEffect } from 'react';
import { useParams, Link, Outlet } from 'react-router-dom';
import { fetchTrendMoviesById } from '../services/api';

export const MovieDetailsPage = () => {
  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);
  useEffect(() => {
    const getMovie = async () => {
      const data = await fetchTrendMoviesById(movieId);
      setMovie(data);
    };
    getMovie();
  }, [movieId]);
  console.log(movie);

  if (!movie) return <h2>Loading...</h2>;
  return (
    <main>
      <div>
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
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
          <Outlet />
        </div>
      </div>
    </main>
  );
};
