import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTrendMoviesById } from '../services/api';

export const MovieDetailsPage = () => {
  const { movieId } = useParams();
  console.log(movieId);

  const [movie, setMovie] = useState(null);
  useEffect(() => {
    const getMovie = async () => {
      const data = await fetchTrendMoviesById(movieId);
      setMovie(data);
    };
    getMovie();
  }, [movieId]);
  if (!movie) return <h2>Loading...</h2>;
  return (
    <main>
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
      />
      <h3>{movie.title}</h3>
      <p>{movie.overview}</p>

      {/* <MovieCast />
      <MovieReviews /> */}
    </main>
  );
};
