import React from 'react'
import classes from './SearchEventsCard.module.css'

function EventCard(){
    return(
        <div className={classes.card}>
            <div className={classes.searchForm}>
                <button>UPCOMING</button>
                <button>LIVE</button>
                <select className={classes.dropdown}>
                <option value="">Filter</option>
                <option value="location1">Sports 1</option>
                <option value="location2">Sports 2</option>
                </select>
            </div>
        </div>
    )
}

export default EventCard;