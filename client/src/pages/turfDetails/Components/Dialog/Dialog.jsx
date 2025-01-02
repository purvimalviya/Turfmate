import React from 'react';
// import classes from './Dialog.module.css'; 

function Dialog({ date, timeSlots, onClose }) {
  return (
    <div className={classes.dialog}>
      <h3>Available Time Slots for {date}</h3>
      {timeSlots.length > 0 ? (
        <ul>
          {timeSlots.map((slot, index) => (
            <li key={index}>{slot}</li>
          ))}
        </ul>
      ) : (
        <p>No available slots for this date.</p>
      )}
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default Dialog;
