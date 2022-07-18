import React from 'react';
import './Day.css';

const Day = ({day, handleClick}) => {
  const daySquareClass = `day ${day.dayValue === "padding" ? "padding" : ""}
  ${day.isCurrentDay ? "currentDay" : ""}`
  return (
    <>
      <div onClick={handleClick} className={daySquareClass}>
        {day.dayValue === "padding" ? "" : day.dayValue}
        {day.dayEvent  && <div className='event'>{day.dayEvent.title}</div>}
      </div>
    </>
  );
}

export default Day;