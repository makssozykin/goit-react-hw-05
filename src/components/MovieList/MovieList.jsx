import { useLocation, Link } from 'react-router-dom';
export const MovieList = ({ movies }) => {
  const location = useLocation();
  return (
    <ul>
      {movies.map(movie => {
        return (
          <li key={movie.id}>
            <Link state={location} to={`/movies/${movie.id}`}>{`${
              movie.title
            } - score ${
              movie.vote_average > 0
                ? ` ${Math.round(movie.vote_average * 10)}%`
                : ' NR'
            }`}</Link>
          </li>
        );
      })}
    </ul>
  );
};
