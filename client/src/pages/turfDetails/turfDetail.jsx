import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import classes from './TurfDetails.module.css';
import loc from '../../assets/location-pin.png'

import t1 from '../../assets/t1.jpg'
import t2 from '../../assets/t2.jpg'
import t3 from '../../assets/t3.jpeg'
import t4 from '../../assets/t4.jpeg'
import t5 from '../../assets/t5.jpeg'
import t6 from '../../assets/t6.jpeg'

import toilet from '../../assets/toilet.png'
import parking from '../../assets/car.png'
import light from '../../assets/light-bulb.png'


function TurfDetails() {
  const imgarr = [t1,t2,t3,t4,t5,t6];

  const { name } = useParams();
  const [turf, setTurf] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [availabilityData, setAvailabilityData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);  
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);  
  const [clientName, setClientName] = useState('');  
  const [selectedSport, setSelectedSport] = useState('');  
  const [price, setPrice] = useState(null);  
  const [isBookingSuccessful, setBookingSuccessful] = useState(false);  // New state for tracking booking success

  useEffect(() => {
    const fetchTurfDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/explore/${name}`);
        if (!response.ok) {
          throw new Error('Failed to fetch turf details');
        }
        const data = await response.json();
        setTurf(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTurfDetails();
  }, [name]);

  useEffect(() => {
    if (turf) {
      const fetchAvailabilityData = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/explore/${turf.name}/avail`);
          const data = await response.json();
          setAvailabilityData(data);
        } catch (error) {
          console.error('Failed to fetch availability data', error);
        }
      };
      fetchAvailabilityData();
    }
  }, [turf]);

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);  
  };

  const handleSportChange = (e) => {
    setSelectedSport(e.target.value);
    setPrice(turf.price_per_sport[e.target.value]);  
  };

  const handleBooking = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/book/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          turfId: turf._id,
          clientName,
          date: selectedDate,
          timeSlot: selectedSlot.timeSlot,
          sport: selectedSport,
          price,
        }),
        credentials: 'include' // Ensure cookies (for sessions) are sent with request
      });

      if (!response.ok) {
        const data = await response.json();
        if (data.message === 'Not authenticated') {
          // Redirect to Google login if not authenticated
          window.location.href = 'http://localhost:5000/auth/google';
          return;
        }
        alert(data.message || 'Booking failed');
        return;
      }

      const data = await response.json();
      if (response.ok) {
        setBookingSuccessful(true);  // Set success state to true on successful booking
      } else {
        alert(data.message || 'Booking failed');
      }
    } catch (error) {
      console.error('Failed to book slot', error);
      alert('Error occurred while booking');
    }
  };

  const toggleCalendar = () => {
    setCalendarVisible(!isCalendarVisible);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);  
    if (availabilityData) {
      const selectedSlots = availabilityData[date]?.slots || [];
      setAvailableSlots(selectedSlots);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={classes.turfDetails}>
      <div className={classes.card}>

        <div className={classes.text_container}>
          <div className={classes.header}>
            <h3 className={classes.title}>{turf.name}</h3>
            <p className={classes.subtitle}>{turf.city}</p>
          </div> 

          <p className={classes.location}><img src={loc} />{turf.location.address}</p>
          <div className={classes.price}>
                {Object.entries(turf.price_per_sport).map(([sport, price]) => (
                  <div key={sport} className={classes.ppsport}>
                    <p className={classes.sportp}> {sport}  </p>
                    <p className={classes.pricep}> ₹{price}/hour </p>
                  </div>
                ))}
          </div>
          <p className={classes.description}>'{turf.description}'</p>
          <p className={classes.amenities}>
            {/* Amenities */}
            {turf.features.lighting && <div><img src={light}/>Lighting </div>}
            {turf.features.parking && <div><img src={parking}/>Parking </div>}
            {turf.features.restrooms && <div><img src={toilet}/>Restrooms </div>}
          </p>

          {!isBookingSuccessful ? (  // Only render content if booking is not successful
            <>
              <button className={classes.bookingButton} onClick={toggleCalendar}>
                Check Availability
              </button>
            </>
          ) : (
            <p className={classes.successMessage}>Booking successful! Thank you for choosing {turf.name}.</p>  // Success message
          )}
        </div>
        <div className={classes.img_box}>
          {/* <img src={turf.images[0]} alt={turf.name} /> */}
          <img src={imgarr[0]} alt={turf.name} />
        </div>
      </div>

      {!isBookingSuccessful && (
        <div className={classes.card2}>
          {isCalendarVisible && (
            <div className={classes.calender}>
              <p className={classes.availtitle}>Select Date</p>
              <div className={classes.datePicker}>
                {Object.keys(availabilityData || {}).map((date) => (
                  <button key={date} onClick={() => handleDateClick(date)}>
                    {date}
                  </button>
                ))}
              </div>
              <div className={classes.availableSlots}>
                <p className={classes.availtitle}>Select Slot</p>
                {availableSlots.map((slot) => (
                  <div
                    key={slot.timeSlot}
                    className={`${classes.slot} ${
                      slot.status === 'Available' ? classes.available : classes.booked
                    }`}
                    onClick={() => slot.status === 'Available' && handleSlotClick(slot)}
                  >
                    {slot.timeSlot} 
                    <div>{slot.status}</div> 
                  </div>
                ))}
              </div>

              {selectedSlot && (
                <div className={classes.bookbtn}>
                  <button onClick={() => setShowBookingForm(true)}>Book Now</button>
                </div>
              )}
            </div>
          )}

          {showBookingForm && (
            <div className={classes.bookingForm}>
              {/* <h3>Confirm Booking</h3> */}
              <div>
                <label>Client Name</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Date</label>
                <input type="text" value={selectedDate} readOnly />
              </div>
              <div>
                <label>Time Slot</label>
                <input type="text" value={selectedSlot.timeSlot} readOnly />
              </div>
              <div>
                <label>Sport</label>
                <select value={selectedSport} onChange={handleSportChange}>
                  <option value="">Select a Sport</option>
                  {turf.allsports.map((sport) => (
                    <option key={sport} value={sport}>
                      {sport}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Price</label>
                <input type="text" value={price} readOnly />
              </div>
              <div className={classes.bookbtn}>
                <button onClick={handleBooking}>Confirm</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TurfDetails;
