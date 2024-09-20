import React from 'react'
import classes from './turf.module.css'
import TurfCard from './Components/TurfCard'
import TurfCard2 from './Components/TurfCard2'
import SearchTurfCard from './Components/SearchTurfCard'
import Carousel from '../../components/Carousel/Carousel'

 function Turfs() {
  return (
    <div className={classes.turfs}>

        {/* <div className={classes.nearbyTurfs}>
        <h2 className={classes.title}>Nearby Turfs</h2>
        <h3 className={classes.subtitle}>in your city</h3>

            <div className={classes.box}>
            <TurfCard/>
            <TurfCard/>
            <TurfCard/>
            </div>
        </div> */}

        {/* <div className={classes.nearbyTurfs}>
            <h2 className={classes.title}>CURRENT OFFERS</h2>
            <Carousel/>
        </div> */}

        <div className={classes.bookTurfs}>
        <h2 className={classes.title}>Book Turfs</h2>
        <h3 className={classes.subtitle}>in your city</h3>
           <SearchTurfCard/>
            <TurfCard2 />
            <TurfCard2 />
            <TurfCard2 />
            <TurfCard2 />
        </div>

    {/* <div className={classes.nearbyTurfs}>
        <h2 className={classes.title}>Tournaments</h2>
    </div> */}
    
    </div>
  )
}


export default Turfs;