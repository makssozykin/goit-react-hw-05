import { fetchMovieCreditsById } from '../../services/api';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const MovieCast = () => {
  const { movieId } = useParams();

  const [casts, setCats] = useState([]);
  useEffect(() => {
    if (!movieId) return;
    const getMovie = async () => {
      const data = await fetchMovieCreditsById(movieId);
      setCats(data);
    };
    getMovie();
  }, [movieId]);

  return casts.length === 0 ? (
    <p>There is no information about the actors!</p>
  ) : (
    <ul>
      {casts.cast.map(cast => (
        <li key={cast.credit_id}>
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}
              alt={cast.name}
            />
            <p>{cast.name}</p>
            <p>Character: {cast.character}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
