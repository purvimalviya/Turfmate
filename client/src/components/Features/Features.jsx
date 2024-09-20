import React from 'react'
import classes from './Features.module.css'
import cricket from '../../assets/cricket.png'
import football from '../../assets/football.png'
import a2 from '../../assets/a2.png'
import a1 from '../../assets/a1.png'


export default function Features() {
  return (
    <div className={classes.feature_section}>
      
      <div className={classes.marq_container}>
        <div className={classes.marq_text}>
            Unite, Play, Dominate - Where players find the perfect venues and build a winning team - Unite, Play, Dominate - Where Turfs boost their bookings and expand their business -  
            Unite, Play, Dominate - Where players find the perfect venues and build a winning team - Unite, Play, Dominate - Where Turfs boost their bookings and expand their business - 
            Unite, Play, Dominate - Where players find the perfect venues and build a winning team - Unite, Play, Dominate - Where Turfs boost their bookings and expand their business  
            
        </div>
      </div>

      <h2 className={classes.title}>FEATURES</h2>
      <div className={classes.feature_circles}>
        <div className={classes.circle}>Explore Nearby Turfs</div>
        <div className={classes.circle}>Create/Join Teams</div>
        <div className={classes.circle}>Discover Tournaments</div>
        <div className={classes.circle}>Avail Amazing Offers</div>
      </div>

      <h2 className={classes.title}>UNITE &#9679; PLAY &#9679; DOMINATE</h2>
      <div className={classes.about_squares}>
        <div className={classes.square}>
          <img src={cricket} alt="cricket stumps" />
        </div>
        <div className={classes.square}>
          <img src={a2} alt="cricket stumps" />
        </div>
        <div className={classes.square}>
          <img src={a1} alt="cricket stumps" />
        </div>
        <div className={classes.square}>
          <img src={football} alt="football ground" />
        </div>
      </div>



    </div>
  )
}
