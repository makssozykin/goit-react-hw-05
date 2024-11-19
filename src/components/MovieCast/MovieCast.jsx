import { fetchMovieCreditsById } from '../../services/api';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const MovieCast = () => {
  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);
  useEffect(() => {
    const getMovie = async () => {
      const data = await fetchMovieCreditsById(movieId);
      setMovie(data);
    };
    getMovie();
  }, [movieId]);

  console.log(movie);
  if (!movie) return <h2>Loading...</h2>;
  return (
    <ul>
      {movie.cast.map(actor => (
        <li key={actor.credit_id}>
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
              alt={actor.name}
            />
            <p>{actor.name}</p>
            <p>Character: {actor.character}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};
