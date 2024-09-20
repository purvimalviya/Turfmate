import React from 'react'
import classes from './TurfCard.module.css'

export default function TurfCard() {
  return (
    <div className={classes.card}>
        <div className={classes.img_box}>
            <img src="https://i.postimg.cc/NfR2yhNs/image-equilibrium.jpg" alt="" />
        </div>
        <h3 className={classes.title}>Kondai Sports</h3>
        <p className={classes.subtitle}>₹150 per hour</p>

        <div className={classes.tags}>
            <p>Cricket</p>
            <p>Football</p>
            <p>Tennis</p>
        </div>

        <button>Book Slot</button>

    </div>
  )
}