import { fetchMovieReviewsById } from '../../services/api';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const MovieReviews = () => {
  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);
  useEffect(() => {
    if (!movieId) return;
    const getMovie = async () => {
      const data = await fetchMovieReviewsById(movieId);
      setMovie(data.results);
    };
    getMovie();
  }, [movieId]);

  if (!movie) return <p>No Reviews added...</p>;
  return (
    <ul>
      {movie.map(author => (
        <li key={author.id}>
          <h3>A review by {author.author}</h3>
          <p>
            Written by <span>{author.author}</span> on{' '}
            {new Date(author.created_at).toLocaleDateString('en-us', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
          <p>{author.content}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieReviews;
