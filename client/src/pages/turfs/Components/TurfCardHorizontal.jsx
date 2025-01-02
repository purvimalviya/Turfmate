import React from 'react';
import { Link } from 'react-router-dom';
import classes from './TurfCardHorizontal.module.css';
import SquareButton from '../../../components/SquareButton/SquareButton';
import loc from '../../../assets/location-pin.png'

 function TurfCardHorizontal({ turf, image }) {
  return (

    <div className={classes.card}>
      <div className={classes.img_box}>
        {/* <img src={turf.images[0]} alt={turf.name} /> */}
        <img src={image} alt={turf.name} />
      </div>
      <div className={classes.text_container}>
        <h3 className={classes.title}>{turf.name}</h3>
        <p className={classes.subtitle}>₹{turf.average_price} per hour</p>
        <div className={classes.tags}>
          {turf.allsports.map((sport, index) => (
            <p key={index} className={classes.sport_tag}>
              {sport}
            </p>
          ))}
        </div>
        <p className={classes.location}> <img src={loc} />  {turf.city}</p>
        {/* <button>Book Slot</button> */}


        <SquareButton link={`/turf/${turf.name}`} text="Book Slot" style={{width:'60%', backgroundColor:'#090909', color:'#efefef'}}></SquareButton>
      </div>
    </div>

  );
}

export default TurfCardHorizontal;