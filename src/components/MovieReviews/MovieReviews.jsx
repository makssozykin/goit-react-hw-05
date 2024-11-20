import { fetchMovieReviewsById } from '../../services/api';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

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
    <ul>
      {reviews.map(review => (
        <li key={review.id}>
          <h3>A review by {review.author}</h3>
          <p>
            Written by <span>{review.author}</span> on{' '}
            {new Date(review.created_at).toLocaleDateString('en-us', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
          <p>{review.content}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieReviews;
