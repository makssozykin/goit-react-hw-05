import { fetchMovieCreditsById } from '../../services/api';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import css from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [casts, setCats] = useState([]);

  const defaultImg =
    'https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster';

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
    <ul className={css['cast-list']}>
      {casts.cast.map(cast => (
        <li key={cast.credit_id} className={css['cast-item']}>
          <img
            src={
              cast.profile_path
                ? `https://image.tmdb.org/t/p/w500/${cast.profile_path}`
                : defaultImg
            }
            alt={cast.name}
          />
          <p>{cast.name}</p>
          <p>{cast.character}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
