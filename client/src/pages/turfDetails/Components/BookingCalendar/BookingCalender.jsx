import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 

function BookingCalendar({ onDateSelect }) {
  const handleDateChange = (date) => {
    onDateSelect(date.toISOString().split('T')[0]); // Pass the selected date in YYYY-MM-DD format
  };

  return (
    <div>
      <Calendar 
        onChange={handleDateChange} 
        minDate={new Date()} // Disable past dates
        maxDate={new Date(new Date().setDate(new Date().getDate() + 7))} // Limit to one week ahead
      />
    </div>
  );
}

export default BookingCalendar;
