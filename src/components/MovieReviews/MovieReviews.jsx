import { fetchMovieReviewsById } from '../../services/api';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import css from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!movieId) return;
    const getMovie = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMovieReviewsById(movieId);
        setReviews(data.results);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getMovie();
  }, [movieId]);

  return reviews.length === 0 ? (
    <p className={css['reviews-no-info']}>No Reviews added...</p>
  ) : (
    <>
      {isLoading && <Loader />}
      <ul className={css['reviews-list']}>
        {reviews.map(review => (
          <li key={review.id} className={css['review-item']}>
            <h3>A review by {review.author}</h3>
            <p>
              Written by <span>{review.author}</span> on{' '}
              {new Date(review.created_at).toLocaleDateString('en-us', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
            <p className={css['review-content']}>{review.content}</p>
          </li>
        ))}
      </ul>
      {error && <ErrorMessage />}
    </>
  );
};

export default MovieReviews;
