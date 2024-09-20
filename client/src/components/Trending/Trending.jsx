import React from 'react'
import classes from './Trending.module.css'
import Carousel from '../Carousel/Carousel'
import Card from '../Card/Card'

import t1 from '../../assets/t1.jpg'
import t2 from '../../assets/t2.jpg'
import t3 from '../../assets/t3.jpeg'
import t4 from '../../assets/t4.jpeg'
import t5 from '../../assets/t5.jpeg'
import t6 from '../../assets/t6.jpeg'

import to1 from '../../assets/to1.png'
import to2 from '../../assets/to2.png'
import to3 from '../../assets/to3.png'



export default function Trending() {
  return (
    <div className={classes.trending_section}>

      <div className={classes.tournaments}>
        <h2 className={classes.title}>UPCOMING TOURNAMENTS</h2>

        <Carousel posters={[to3,to1,to2]}/>
      </div>

      <div className={classes.popular_turfs}>
        <h2 className={classes.title}>POPULAR TURFS</h2>
        <h3 className={classes.subtitle}>in different cities</h3>

        <div className={classes.box}>
          {/* <div className={classes.item}></div>
          <div className={classes.item}></div>
          <div className={classes.item}></div>
          <div className={classes.item}></div>
          <div className={classes.item}></div>
          <div className={classes.item}></div> */}
          <Card thumbnail={t1} city="Ahmedabad" turfName="Polo Club" sports={["Cricket","Football","Soccer"]} link="/turfs" />
          <Card thumbnail={t6} city="Kolkata" turfName="Courtyard Turf" sports={["Football","Soccer"]} link="/turfs" />
          <Card thumbnail={t3} city="Jaipur" turfName="The Big Turf" sports={["Cricket","Football","Volleyball"]} link="/turfs" />
          <Card thumbnail={t5} city="Pune" turfName="United City Scape" sports={["Cricket"]} link="/turfs" />
          <Card thumbnail={t4} city="Delhi" turfName="Hatrick Sport Club" sports={["Cricket","Football","Volleyball"]} link="/turfs" />
          <Card thumbnail={t2} city="Indore" turfName="Greenfield Astro" sports={["Badminton","Volleyball"]} link="/turfs" />
        </div>
        {/* <Carousel/> */}
      </div>

      {/* <div className={classes.popular_turfs}></div> */}

    </div>
  )
}


