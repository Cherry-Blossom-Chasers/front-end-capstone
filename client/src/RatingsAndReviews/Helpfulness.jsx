/* eslint-disable no-undef */
import React from 'react';
import axios from 'axios';

export default function Helpfullness({ review_id, helpful }) {
  const [count, setCount] = React.useState(helpful);
  const [clicked, setClicked] = React.useState(
    JSON.parse(localStorage.getItem(`${review_id}`)) || false,
  );

  // User can only click helpfulness once per review, even upon page refresh so store in LS
  function clickHandler(markedYes) {
    if (!clicked) {
      localStorage.setItem(`${review_id}`, 'true');
      if (markedYes) {
        console.log('marked yes is checked')
        axios.put(`/reviews/helpful?review_id=${review_id}`)
          .then(() => {
            setCount(count + 1);
          })
          .catch((err) => { throw err; });
      }
      setClicked(!clicked);
    }
  }

  return (
    <>
      <div className="helpful">
        Helpful?
        <button type="button" className="h-btn" aria-label="Mark Review Helpful" onClick={() => { clickHandler(true); }}>{`Yes (${count})`}</button>
        <button type="button" className="h-btn no-btn" aria-label="Mark Review Not Helpful" onClick={() => { clickHandler(false); }}>No</button>
        {' | '}
        <button type="button" className="h-btn" aria-label="Report This Review">Report</button>
      </div>
      {clicked && <span className="ty-message">Thanks for the feedback!</span>}
    </>
  );
}
