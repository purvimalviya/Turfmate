import React from 'react'
import { Link } from 'react-router-dom';
import classes from './Hero.module.css'
import hero from '../../../../assets/hero3.png'

export default function Hero() {
  return (
    <div className={classes.hero_section}>
      <img src={hero} alt="Turf Mate" className={classes.heroimg}/>
      <div className={classes.cta_buttons}>
      <Link to="/turfs" className={classes.link_no_underline}>
        <p className={classes.bt_alt}>BOOK <span>TURF</span>.</p>
        </Link>
        <p className={classes.bt_alt}>BUILD <span>TEAM</span>.</p>
      </div>
      <div className={classes.sports}>
        <p>FOOTBALL</p>
        <p>CRICKET</p>
        <p><span>AND</span></p>
        <p><span>MORE</span></p>
      </div>
    </div>
  )
}
