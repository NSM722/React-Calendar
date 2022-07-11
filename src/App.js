import React, { useState, useEffect } from 'react';
import Day from "../src/components/Day";
import NewEventModal from './components/NewEventModal';
import DeleteEventModal from './components/DeleteEventModal';
import Header from './components/Header';
import useDateAPI from './hooks/useDateAPI';



const App = () => {
  const [monthCounter, setMonthCounter] = useState(0);
  //const [days, setDays] = useState([]);
  //const [dateDisplay, setDateDisplay] = useState("");
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

  const { days, dateDisplay } = useDateAPI(events, monthCounter)

  useEffect(() => {
    getAdvice()
  }, [])

  const handleClickNext = () => {
    setMonthCounter(monthCounter + 1)
    getAdvice();
  }

  const handleClickPrevious = () => {
    setMonthCounter(monthCounter - 1)
    getAdvice();
  }

  return (
    <>
      <div id="container">
        <div className="advice-container">
          <p id="advice">{advice}</p>
        </div>
        <Header 
          dateDisplay={dateDisplay}
          handleClickNext={handleClickNext}
          handleClickPrevious={handleClickPrevious}
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
