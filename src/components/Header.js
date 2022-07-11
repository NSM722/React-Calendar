import React from 'react';

const Header = ({handleClickNext, handleClickPrevious, dateDisplay}) => {
  return (
    <>
      <div id="header">
        <div id="monthDisplay">{dateDisplay}</div>
        <div>
          <button
          onClick={handleClickPrevious}
          id="previousButton">
          &laquo; Previous
          </button>
          <button
          onClick={handleClickNext}
          id="nextButton">
          Next &raquo;
          </button>
        </div>
      </div>
    </>
  );
}

export default Header;