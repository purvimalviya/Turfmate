import React from 'react';
import classes from './TurfCard2.module.css';

 function TurfCard2() {
  return (
    <div className={classes.card}>
      <div className={classes.img_box}>
        <img src="https://i.postimg.cc/NfR2yhNs/image-equilibrium.jpg" alt="" />
      </div>
      <div className={classes.text_container}>
        <h3 className={classes.title}>Kondai Sports</h3>
        <p className={classes.subtitle}>₹150 per hour</p>
        
        <button>Book Slot</button>
      </div>
    </div>
  );
}

export default TurfCard2;