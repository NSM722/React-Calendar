import React, { useState, useEffect } from 'react';
import Day from "../src/components/Day";
import NewEventModal from './components/NewEventModal';
import DeleteEventModal from './components/DeleteEventModal';
import Header from './components/Header';



const App = () => {
  const [monthCounter, setMonthCounter] = useState(0);
  const [days, setDays] = useState([]);
  const [dateDisplay, setDateDisplay] = useState("");
  const [clicked, setClicked] = useState();
  const [events, setEvents] = useState(
    localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : []
  )

  const [advice, setAdvice] = useState("loading...");
  
  const eventForDate = date => {
    return events.find(event => {
      return event.date === date
    });
  }

  const getAdvice = () => {
    fetch("https://api.adviceslip.com/advice")
    .then(response => response.json())
    .then(data => {
      //console.log(data);
      setAdvice(data.slip.advice)
    })
    .catch(error => {
      console.error(error);
    });
  }

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

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

  useEffect(() => {
    getAdvice()
  }, [])



  return (
    <>
      <div id="container">
        <div className="advice-container">
          <p id="advice">{advice}</p>
        </div>
        <Header 
          dateDisplay={dateDisplay}
          handleClickNext={() => setMonthCounter(monthCounter + 1)}
          handleClickPrevious={() => setMonthCounter(monthCounter - 1)}
        />
        <div id="weekdays">
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
          <div>Sun</div>
        </div>
        <div id="calendar">
          {days.map((day, index) => (
            <Day 
              key={index}
              day={day}
              handleClick={() => {
                if (day.dayValue !== "padding") {
                  setClicked(day.date);
                }
              }}
            />
          ))}
        </div>
      </div>
      {
        clicked && !eventForDate(clicked) &&
        <NewEventModal 
          handleClickClose={() => setClicked(null)}
          handleClickSave={title => {
            setEvents([...events, {title, date: clicked}])
            setClicked(null);
        }}
        /> 
      }
      {
        clicked && eventForDate(clicked) && 
        <DeleteEventModal 
          eventText={eventForDate(clicked).title}
          handleClickClose={() => setClicked(null)}
          handleClickDelete={() => {
            setEvents(events.filter(event => (
              event.date !== clicked
            )));
            setClicked(null);
          }}
        />
      } 
    </>
  );
}

export default App;
