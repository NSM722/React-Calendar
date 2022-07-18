import React, { useState, useEffect } from 'react';
import Day from "./components/Day/Day";
import Weekday from './components/Weekday/Weekday';
import NewEventModal from './components/NewEventModal/NewEventModal';
import DeleteEventModal from './components/DeleteEventModal/DeleteEventModal';
import Header from './components/Header/Header';
import useDateAPI from './hooks/useDateAPI';
//import Api from './components/Api/Api';
//import getAdvice from './components/Api/Api';



const App = () => {
  /**
   * State that keeps track of the month 
   * upon clicking the previous and back button
   */
  const [monthCounter, setMonthCounter] = useState(0);
  
  /**
   *  Day/Date that is clicked on to create or delete
   * an event
   */
  const [clicked, setClicked] = useState();

  /**
   * Array state of event objects - the array is manipulated 
   * depending on the user adding or deleting events
   */
  const [events, setEvents] = useState(
    /** Initializing the events variable in local storage*/
    localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : []
  )

  // Api state
  const [advice, setAdvice] = useState("Loading...");
  
  const eventForDate = date => {
    return events.find(event => {
      return event.date === date
    });
  }

  // eslint-disable-next-line no-lone-blocks
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

  /**
   * State that updates local storage when events 
   * value changes
   */
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);


  // Destructing days and dateDisplay from the useDateAPI hook
  const { days, dateDisplay } = useDateAPI(events, monthCounter)

  // eslint-disable-next-line no-lone-blocks
  useEffect(() => {
    getAdvice()
  }, [])

  /**
   * Helper function to increment month upon
   * clicking on the next button
   */
  const handleClickNext = () => {
    setMonthCounter(monthCounter + 1)
    getAdvice()
  }

  /**
   * Helper function to decrement month upon
   * clicking on the previous button
   */
  const handleClickPrevious = () => {
    setMonthCounter(monthCounter - 1)
    getAdvice()
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
        <Weekday />
        <div id="calendar">
          {/**
           * Mapping a single day onto a Day component
           */}
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
