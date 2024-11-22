import { BiError } from 'react-icons/bi';
import s from './ErrorMessage.module.css';

const ErrorMessage = () => {
  return (
    <div className={s['error-cont']}>
      <BiError className={s['error-svg']} />
      <p className={s['error-text']}>Oops! Bad Request!</p>
    </div>
  );
};

export default ErrorMessage;
