import React from 'react'
import classes from './Card.module.css'
import { Link } from 'react-router-dom'

export default function Card({thumbnail, city, turfName, sports, link}) {
  return (
    <div className={classes.card}>
        <div className={classes.img_box}>
            {/* <img src="https://i.postimg.cc/NfR2yhNs/image-equilibrium.jpg" alt="" /> */}
            <img src={thumbnail} alt="" />
        </div>
        <h3 className={classes.title}>{city}</h3>
        <p className={classes.subtitle}>{turfName}</p>

        <div className={classes.tags}>
        {/* Mapping through the sports array and rendering each sport in a <p> tag */}
        {sports.map((sport, index) => (
          <p key={index}>{sport}</p>
        ))}
      </div>

        {/* <button>MORE TURFS</button> */}
        <button ><Link to={link}>MORE TURFS</Link></button>

    </div>
  )
}
