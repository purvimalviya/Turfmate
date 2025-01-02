import React from 'react'
import classes from './RoundButton.module.css'

export default function RoundButton({onClickFunc,text}) {
  return (
    <>
        <button className={classes.roundbutton} onClick={onClickFunc}>
          {text}
        </button>
    </>
  )
}
