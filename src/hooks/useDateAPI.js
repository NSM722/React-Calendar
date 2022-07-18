// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect }from 'react';

/**
 * Custom hook that has the Date API logic 
 */
const useDateAPI = (events, monthCounter) => {

  const[dateDisplay, setDateDisplay] = useState("");
  const[days, setDays] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const eventForDate = date => {
    return events.find(event => {
      return event.date === date
    });
  }

  useEffect(() => {
    const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun',];
    
    /** Creating a date object*/
    const date = new Date();

    /**
     * Add/subtract monthCounter to the value of the current 
     * month when the next button is clicked. The Below link 
     * explains about the second paramenter(1) in the setMonth method
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth#description
     */
    if (monthCounter !== 0) {
      date.setMonth(new Date().getMonth() + monthCounter, 1);
    }

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    // Gets the first day of the month
    const firstDayOfMonth = new Date(year, month, 1)

    /**
     * Find the number of days in the month in order to load the 
     * correct amount of day squares. The third argument(0) in this 
     * date instance  represents the last day of the previous month
     */
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const options = { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };

    /**
     * toLocaleString converts the date object 
     * to a string to enable operations
     */
    const dateString = firstDayOfMonth.toLocaleDateString('en-GB', options);

    // Setting the Month and rendering it as e.g 'July 2022'
    setDateDisplay(`${date.toLocaleDateString('en-GB', { month: 'long' })} ${year}`)

    /**
     * This variable stores the number of day(s) before 
     * the first day of the current month. These are days
     * of the previous month
     * 
     * console.log(dateString) - To visualize and understand
     * why the below split uses a comma and a space and returns
     * the value at index 0
     */
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

    /**
     * Array that holds an object containing the numerical day value
     * to be rendered on the day square, any event saved, class for 
     * current day if indeed it's the current day(true/false value) &
     * the actual date value
     */
    const daysArray = [];

    /**
     * Looping through all padding days and days of the month 
     * and render them as day squares
     */
    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
      const clickedDateString = `${i - paddingDays}/${month + 1}/${year}`;

      // Logic to determine whether to render a padding day or actual day square
      if(i > paddingDays) {
        daysArray.push({
          dayValue: i - paddingDays,
          dayEvent: eventForDate(clickedDateString),
          isCurrentDay: i - paddingDays === day && monthCounter === 0,
          date: clickedDateString
        });
      } else {
          daysArray.push({
          dayValue: "padding",
          dayEvent: null,
          isCurrentDay: false,
          date: ""
        });
      }
      setDays(daysArray);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events, monthCounter]);

  return {
    days,
    dateDisplay
  };
}

export default useDateAPI;