import React, { useState } from 'react';

const NewEventModal = ({ handleClickSave, handleClickClose }) => {

  const [title, setTitle] = useState("");
  const [errorHighlight, setErrorHighlight] = useState(false);

  return (
    <>
      <div id="newEventModal">
        <h2>New Event</h2>
        <input
        value={title}
        onChange={event => setTitle(event.target.value)}
        className={errorHighlight ? "error" : ""}
        id="eventTitleInput" 
        placeholder="Event Title" 
        />
        <button 
        onClick={() => {
          if (title) {
            setErrorHighlight(false);
            handleClickSave(title)
          } else {
            setErrorHighlight(true);
          }
        }}
        id="saveButton"
        >Save</button>
        <button
        onClick={handleClickClose}
        id="cancelButton">
        Cancel</button>
      </div>
      <div id="modalBackDrop"></div>
    </>
  );
}

export default NewEventModal;