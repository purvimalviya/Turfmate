import React, { useState, useEffect, useRef } from 'react'
import classes from './turf.module.css'
import TurfCardHorizontal from './Components/TurfCardHorizontal'
import SearchTurfCard from './Components/SearchTurfCard'

import t1 from '../../assets/t1.jpg'
import t2 from '../../assets/t2.jpg'
import t3 from '../../assets/t3.jpeg'
import t4 from '../../assets/t4.jpeg'
import t5 from '../../assets/t5.jpeg'
import t6 from '../../assets/t6.jpeg'

 function Turfs() {

  const [turfs, setTurfs] = useState([]);
  const imgarr = [t1,t2,t3,t4,t5,t6];

  return (
    <div className={classes.turfs}>

        <div className={classes.bookTurfs}>
            <h2 className={classes.title}>Book Turfs</h2>
            <h3 className={classes.subtitle}>in your city</h3>

             {/* Pass setTurfs as a prop to SearchTurfCard */}
            <SearchTurfCard setTurfs={setTurfs} />

            {/* Map the turfs array to display the results */}
            <div className={classes.turfResults}>
            {turfs.length > 0 ? (
                turfs.map((turf, index) => (
                    // Pass the corresponding image from imgarr using the index
                    <TurfCardHorizontal key={turf._id} turf={turf} image={imgarr[index % imgarr.length]} />
                ))
                ) : (
                <p>No turfs found</p>
                )}
            </div>
        </div>
    
    </div>
  )
}


export default Turfs;