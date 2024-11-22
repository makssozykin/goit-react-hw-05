import { fetchMovieReviewsById } from '../../services/api';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import css from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();

  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    if (!movieId) return;
    const getMovie = async () => {
      const data = await fetchMovieReviewsById(movieId);
      setReviews(data.results);
    };
    getMovie();
  }, [movieId]);

  return reviews.length === 0 ? (
    <p>No Reviews added...</p>
  ) : (
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
  );
};

export default MovieReviews;
