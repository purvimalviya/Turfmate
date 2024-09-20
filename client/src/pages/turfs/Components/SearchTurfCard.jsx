import React from 'react'
import classes from './SearchTurfCard.module.css'

export default function TurfCard() {
  return (
    <div className={classes.card}>
    <div className={classes.searchForm}>
        <select className={classes.dropdown}>
          <option value="">Type</option>
          <option value="football">Football</option>
          <option value="cricket">Cricket</option>
          <option value="tennis">Tennis</option>
        </select>

        <select className={classes.dropdown}>
        <option value="">Location</option>
          <option value="location1">Location 1</option>
          <option value="location2">Location 2</option>
        </select>

        <select className={classes.dropdown}>
        <option value="">Date</option>
          <option value="today">Today</option>
          <option value="tomorrow">Tomorrow</option>
        </select>

        <select className={classes.dropdown}>
        <option value="">Price</option>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
        </select>
    <button className={classes}>search</button>
 
    </div>

    </div>
  )
}