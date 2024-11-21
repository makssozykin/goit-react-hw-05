import { TiArrowBack } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import css from './BackLink.module.css';
export const BackLink = ({ to, children }) => {
  return (
    <div className={css['btn-container']}>
      <Link to={to} className={css['back-btn']}>
        <TiArrowBack className={css['back-btn-icon']} />
        <p className={css['back-btn-text']}>{children}</p>
      </Link>
    </div>
  );
};
