import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './Navbar.module.css'
import logo from '../../assets/logo.png'
export default function Navbar() {
  return (
    <div className={classes.navbar}>
        <img src={logo} alt="Turfmate" className={classes.logo}/>

        <div className={classes.nav_right}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${classes.nav_link} ${classes.active}` : classes.nav_link
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/turfs"
          className={({ isActive }) =>
            isActive ? `${classes.nav_link} ${classes.active}` : classes.nav_link
          }
        >
          Turfs
        </NavLink>
        <NavLink
          to="/team"
          className={({ isActive }) =>
            isActive ? `${classes.nav_link} ${classes.active}` : classes.nav_link
          }
        >
          Team
        </NavLink>
        <NavLink
          to="/tournaments"
          className={({ isActive }) =>
            isActive ? `${classes.nav_link} ${classes.active}` : classes.nav_link
          }
        >
          Tournaments
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? `${classes.nav_link} ${classes.active}` : classes.nav_link
          }
        >
          Profile
        </NavLink>
        </div>
    </div>
  )
}
