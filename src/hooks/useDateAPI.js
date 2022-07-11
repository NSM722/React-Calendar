import React, { useState, useEffect }from 'react';

const useDateAPI = (events, monthCounter) => {

  const[dateDisplay, setDateDisplay] = useState("");
  const[days, setDays] = useState([]);

  const eventForDate = date => {
    return events.find(event => {
      return event.date === date
    });
  }

  useEffect(() => {
    const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun',];
    const date = new Date();

    if (monthCounter !== 0) {
      date.setMonth(new Date().getMonth() + monthCounter, 1);
    }

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1)
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const options = { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };

    const dateString = firstDayOfMonth.toLocaleDateString('en-GB', options);

    setDateDisplay(`${date.toLocaleDateString('en-GB', { month: 'long' })} ${year}`)
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

    const daysArray = [];

    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
      const clickedDateString = `${i - paddingDays}/${month + 1}/${year}`;

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

  }, [events, monthCounter]);

  return {
    days,
    dateDisplay
  };
}

export default useDateAPI;