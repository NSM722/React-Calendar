import React from 'react';
import './DeleteEventModal.css';


/**
 * 
 * @param {component} param0 
 * @ deletes existing event 
 */
const DeleteEventModal = ({handleClickDelete, eventText, handleClickClose}) => {
  return (
    <>
      <div id="deleteEventModal">
        <h2>Event</h2>
        <p id="eventText">{eventText}</p>
        <button
        onClick={handleClickDelete}
        id="deleteButton">
        Delete</button>
        <button
        onClick={handleClickClose}
        id="closeButton">
        Close</button>
      </div>
      <div id="modalBackDrop"></div>
    </>
  );
}


export default DeleteEventModal;