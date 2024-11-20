import { fetchMovieCreditsById } from '../../services/api';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const MovieCast = () => {
  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);
  useEffect(() => {
    if (!movieId) return;
    const getMovie = async () => {
      const data = await fetchMovieCreditsById(movieId);
      setMovie(data);
    };
    getMovie();
  }, [movieId]);

  if (!movie) return <p>There is no information about the actors!</p>;
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

export default MovieCast;
