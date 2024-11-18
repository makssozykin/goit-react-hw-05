// import { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { MoviesPage } from './pages/MoviesPage';
import { MovieDetailsPage } from './pages/MovieDetailsPage';
import { NotFoundPage } from './pages/NotFoundPage';

import { MovieCast } from './components/MovieCast/MovieCast';
import { MovieReviews } from './components/MovieReviews/MovieReviews';
// import { fetchMovies } from './services/api';

import './App.css';

function App() {
  // const [movies, setMovies] = useState([]);
  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const response = await fetchMovies();
  //       console.log(response);
  //       setMovies(response.results);
  //     } catch (error) {
  //       console.error('Error fetching movies:', error);
  //     }
  //   };
  //   getData();
  // }, [movies]);
  return (
    <>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/movies">Movie</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
