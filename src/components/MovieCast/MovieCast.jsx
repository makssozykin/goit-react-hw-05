import { fetchMovieCreditsById } from '../../services/api';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import css from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [casts, setCats] = useState([]);

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
        const data = await fetchMovieCreditsById(movieId);
        setCats(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getMovie();
  }, [movieId]);

  return casts.length === 0 ? (
    <p className={css['cast-no-info']}>
      There is no information about the actors!
    </p>
  ) : (
    <>
      {isLoading && <Loader />}
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
      {error && <ErrorMessage />}
    </>
  );
};

export default MovieCast;
