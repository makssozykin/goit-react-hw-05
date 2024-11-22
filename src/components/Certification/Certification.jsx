import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  fetchMoviesById,
  fetchMoviesCertificationById,
} from '../../services/api';
import css from './Certification.module.css';

export const Certification = ({ children }) => {
  const { movieId } = useParams();
  const [certification, setCertification] = useState('');
  const [country, setCountry] = useState('');

  useEffect(() => {
    if (!movieId) return;
    const getMovie = async () => {
      try {
        const data = await fetchMoviesById(movieId);
        const { results } = await fetchMoviesCertificationById(movieId);

        const ageArr = results
          .filter(
            result => result.iso_3166_1 === 'UA' || result.iso_3166_1 === 'US'
          )
          .filter(result => {
            if (
              result.iso_3166_1 === 'UA' &&
              result.release_dates[0].certification !== ''
            ) {
              return result.release_dates[0].certification;
            } else if (
              result.iso_3166_1 === 'US' &&
              result.release_dates[0].certification !== ''
            ) {
              return result.release_dates[0].certification;
            } else if (
              result.iso_3166_1 === 'US' &&
              result.release_dates[0].certification === ''
            ) {
              return (result.iso_3166_1 =
                data.origin_country &&
                result.release_dates[0].certification === <s>NA</s>);
            } else if (
              result.iso_3166_1 === 'US' &&
              result.release_dates[1].certification !== ''
            ) {
              return result.release_dates[1].certification;
            }
          });

        const age =
          ageArr.length === 0 ? (
            <s>NA</s>
          ) : ageArr[0].release_dates[0].certification !== '' ? (
            ageArr[0].release_dates[0].certification
          ) : ageArr[0].release_dates[1].certification === '' ? (
            <s>NA</s>
          ) : (
            ageArr[0].release_dates[1].certification
          );

        const countryName =
          ageArr.length === 0 ? data.origin_country : ageArr[0].iso_3166_1;

        setCertification(age);
        setCountry(countryName);
      } catch (error) {
        console.log('Error:', error);
      }
    };
    getMovie();
  }, [movieId]);

  return (
    <>
      <span className={css.certification}>{certification}</span>{' '}
      <span>{children}</span> <span>({country})</span>
    </>
  );
};
