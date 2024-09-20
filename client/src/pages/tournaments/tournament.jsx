import React from 'react'
import classes from './tournament.module.css'
import TurfCard2 from '../turfs/Components/TurfCard2';
import EventCard from './Components/SearchEventsCard'

function Tournaments(){
    return(
        <div>
        <div className={classes.tournamnets}>
            
      <h2 className={classes.title}>YOUR LOCATION : </h2>
      
      <div className={classes.feature_circles}>
        <div className={classes.circle}>Cricket</div>
        <div className={classes.circle}>Football</div>
        <div className={classes.circle}>All Sports</div>
        <div className={classes.circle}>Offers</div>
      </div>
      </div>
      
      <div className={classes.bookTurfsBG}>
      <div className={classes.bookTurfs}>
        <h2 className={classes.title2}>TOURNAMENTS</h2>
        <h3 className={classes.subtitle}>in your city</h3>
            <EventCard />
            <TurfCard2 />
            <TurfCard2 />
            <TurfCard2 />
            <TurfCard2 />
        </div></div>


        
        </div>
    )
}

export default Tournaments;