import React from 'react';
import './Day.css';

  /**
   * Under the return statement a div 
   * is created for every existing day
   * with necessary classes added
   * Additionally a div for an event is 
   * also created and given a class
   */

const Day = ({day, handleClick}) => {
  // Variable to hold different classes for the day
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