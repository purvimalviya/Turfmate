import React from 'react'
import { Link } from 'react-router-dom'
import classes from './SquareButton.module.css'

export default function SquareButton({link, text, style}) {
  return (
    <>
        <Link to={link}> <button className={classes.squarebutton} style={style}> {text} </button> </Link>
    </>
  )
}
