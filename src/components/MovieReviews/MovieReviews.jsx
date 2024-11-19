import { fetchMovieReviewsById } from '../../services/api';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const MovieReviews = () => {
  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);
  useEffect(() => {
    const getMovie = async () => {
      const data = await fetchMovieReviewsById(movieId);
      setMovie(data.results);
    };
    getMovie();
  }, [movieId]);

  console.log(movie);
  if (!movie) return <h2>Loading...</h2>;
  return <div>MovieReviews</div>;
};
