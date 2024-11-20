import css from './ChooseDate.module.css';

const ChooseDate = ({ value, handleDateChange }) => {
  return (
    <>
      <div className={css['toggle-radio']}>
        <input
          id="day"
          type="radio"
          name="date"
          value="day"
          checked={value === 'day'}
          onChange={handleDateChange}
        />
        <input
          id="week"
          type="radio"
          name="date"
          value="week"
          checked={value === 'week'}
          onChange={handleDateChange}
        />
        <div className={css.switch}>
          <label htmlFor="day">Day</label>
          <label htmlFor="week">Week</label>
          <span></span>
        </div>
      </div>
    </>
  );
};

export default ChooseDate;
