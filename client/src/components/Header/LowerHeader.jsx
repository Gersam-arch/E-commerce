import React from 'react'
import classes from './Header.module.css'

const LowerHeader = () => {
  return (
    <div className={classes.lower_container}>
      <button className={classes.all_btn}>☰ All</button>
      <button className={classes.nav_btn}>Today's Deals</button>
      <button className={classes.nav_btn}>Electronics</button>
      <button className={classes.nav_btn}>Fashion</button>
      <button className={classes.nav_btn}>Home & Kitchen</button>
      <button className={classes.nav_btn}>Books</button>
      <button className={classes.nav_btn}>Customer Service</button>
      <div className={classes.flash_deals}>
        ⚡ Flash Deals Live
      </div>
    </div>
  )
}

export default LowerHeader