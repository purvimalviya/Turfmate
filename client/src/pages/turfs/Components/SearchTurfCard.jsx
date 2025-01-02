import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import classes from './SearchTurfCard.module.css';
import RoundButton from '../../../components/RoundButton/RoundButton';

export default function SearchTurfCard({ setTurfs }) {
  const [cities, setCities] = useState([]);
  const [sports, setSports] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  const nameRef = useRef('');

  useEffect(() => {
    const fetchCitiesAndSports = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/explore/citiesandsports');
        setCities(response.data.cityNames);
        setSports(response.data.sportNames);
      } catch (error) {
        console.error('Error fetching cities and sports:', error);
      }
    };
    fetchCitiesAndSports();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [selectedCity, selectedSport]);

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/explore/', {
        params: {
          city: selectedCity,
          sport: selectedSport,
          name: nameRef.current.value,
        },
      });
      setTurfs(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error searching turfs:', error);
    }
  };

  return (
    <div className={classes.card}>
      <div className={classes.searchForm}>
        
        {/* Dropdown for selecting sport (type) with label */}
        <div>
          <label htmlFor="sportDropdown" className={classes.label}>
            Sport
          </label>
          <select
            id="sportDropdown"
            className={classes.dropdown}
            value={selectedSport}
            onChange={(e) => setSelectedSport(e.target.value)}
          >
            <option value="">All</option>
            {sports.map((sport, index) => (
              <option key={index} value={sport}>
                {sport}
              </option>
            ))}
          </select>
        </div>

        {/* Dropdown for selecting city (location) with label */}
        <div>
          <label htmlFor="cityDropdown" className={classes.label}>
            City
          </label>
          <select
            id="cityDropdown"
            className={classes.dropdown}
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="">All</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div>
          <input
            type="text"
            placeholder="Enter Turf Name"
            className={classes.inputBox}
            ref={nameRef}
          />

          <RoundButton onClickFunc={handleSearch} text="Search" />
        </div>

      </div>
    </div>
  );
}
