import React, { useState } from 'react';
import g1 from '../../../assets/g1.png'
import styles from './dashboard.module.css';

const Dashboard = () => {
  const [formData, setFormData] = useState({
    turfName: '',
    city: '',
    address: '',
    contact: '',
    amenities: {
      lighting: false,
      parking: false,
      washroom: false,
    },
    sports: [{ name: '', price: '' }],
    timings: '',
  });

  const [bookings] = useState(generateRandomBookings());

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      amenities: {
        ...formData.amenities,
        [name]: checked,
      },
    });
  };

  const handleSportChange = (e, index) => {
    const { name, value } = e.target;
    const updatedSports = [...formData.sports];
    updatedSports[index] = {
      ...updatedSports[index],
      [name]: value, // Directly update 'name' or 'price' field
    };
    setFormData({
      ...formData,
      sports: updatedSports,
    });
  };

 
  const addSport = () => {
    setFormData({
      ...formData,
      sports: [...formData.sports, { name: '', price: '' }],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
  };


  function generateRandomBookings() {
    const names = ['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Brown', 'Michael White'];
    const sports = ['Football', 'Tennis', 'Cricket', 'Badminton', 'Hockey'];
    const bookingData = [];

    for (let i = 0; i < 6; i++) {
      bookingData.push({
        clientName: names[Math.floor(Math.random() * names.length)],
        amount: `$${Math.floor(Math.random() * 100) + 50}`,
        sport: sports[Math.floor(Math.random() * sports.length)],
        date: `${Math.floor(Math.random() * 30) + 1}/10/2024`,
        time: `${Math.floor(Math.random() * 12) + 1}:00 PM`,
        contact: `+91-${Math.floor(Math.random() * 1000000000).toString().padStart(10, '0')}`,
      });
    }
    return bookingData;
  }

  return (
    <div className={styles.dashContainer}>
      <div className={styles.buildflex}>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          {/* Turf Name */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Turf Name</label>
            <input
              type="text"
              name="turfName"
              value={formData.turfName}
              onChange={handleChange}
              className={styles.input}
              placeholder="Enter Turf Name"
              required
            />
          </div>

          {/* City */}
          <div className={styles.formGroup}>
            <label className={styles.label}>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={styles.input}
              placeholder="Enter City"
              required
            />
          </div>

          {/* Address */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={styles.input}
              placeholder="Enter Address"
              required
            />
          </div>

          {/* Contact */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Contact</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className={styles.input}
              placeholder="Contact Information"
              required
            />
          </div>

          {/* Amenities */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Amenities</label>
            <div className={styles.checkboxGroup}>
              <label className={styles.labelch}>
                <input
                  type="checkbox"
                  name="lighting"
                  checked={formData.amenities.lighting}
                  onChange={handleCheckboxChange}
                />
                Lighting
              </label>
              <label className={styles.labelch}>
                <input
                  type="checkbox"
                  name="parking"
                  checked={formData.amenities.parking}
                  onChange={handleCheckboxChange}
                />
                Parking
              </label>
              <label className={styles.labelch}>
                <input
                  type="checkbox"
                  name="washroom"
                  checked={formData.amenities.washroom}
                  onChange={handleCheckboxChange}
                />
                Washroom
              </label>
            </div>
          </div>

          {/* Sports and Price */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Sports and Price</label>
            {formData.sports.map((sport, index) => (
              <div key={index} className={styles.sportItem}>
                <input
                  type="text"
                  name="name"
                  value={sport.name}
                  onChange={(e) => handleSportChange(e, index)}
                  className={styles.input}
                  placeholder="Enter Sport Name"
                  required
                />
                <input
                  type="text"
                  name="price"
                  value={sport.price}
                  onChange={(e) => handleSportChange(e, index)}
                  className={styles.input}
                  placeholder="Enter Price"
                  required
                />
              </div>
            ))}
            <button type="button" onClick={addSport} className={styles.addButton}>
              Add Another Sport
            </button>
          </div>

          {/* Timings */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Timings</label>
            <input
              type="text"
              name="timings"
              value={formData.timings}
              onChange={handleChange}
              className={styles.input}
              placeholder="Enter Time Slots"
              required
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Add Turf
          </button>
        </form>

        {/* Bookings Section */}
        <div className={styles.bookings}>
            <h3>Client Bookings</h3>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;
