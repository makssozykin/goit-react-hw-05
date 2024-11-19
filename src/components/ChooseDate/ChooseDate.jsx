const ChooseDate = ({ value, handleDateChange }) => {
  return (
    <>
      <div className="options">
        <p>Select date</p>
        <label>
          <input
            type="radio"
            name="date"
            value="day"
            checked={value === 'day'}
            onChange={handleDateChange}
          />
          Day
        </label>
        <label>
          <input
            type="radio"
            name="date"
            value="week"
            checked={value === 'week'}
            onChange={handleDateChange}
          />
          Week
        </label>
      </div>
    </>
  );
};

export default ChooseDate;
