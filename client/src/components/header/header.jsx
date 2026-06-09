import React from 'react'
import { SlLocationPin } from 'react-icons/sl'
import { BsSearch } from 'react-icons/bs'
import { BiCart } from 'react-icons/bi'
import { TbWorld } from 'react-icons/tb'
import classes from './header.module.css'
import LowerHeader from './LowerHeader'
const Header = () => {
  return (
    <>
      <section>
        <div className={classes.header_container}>
          {/* Logo Section */}
          <div className={classes.logo_container}>
            <a href="#">
              <img 
                src={require('./image/logo_small.png')} 
              />
            </a>
          </div>

          {/* Delivery Location Section */}
          <div className={classes.delivery}>
            <SlLocationPin />
            <div>
              {/* <p>Delivered to</p> */}
              <span>Ethiopia</span>
            </div>
          </div>

          {/* Search Section */}
          <div className={classes.search}>
            <select name="category">
              <option value="All">All</option>
            </select>
            <input 
              type="text" 
              placeholder="Search products" 
            />
            <button className={classes.search_icon}>
              <BsSearch size={25} />
            </button>
          </div>

          {/* Language Section */}
       {/* Language */}
            <div className={classes.language}>
            <TbWorld size={20} />
            <select>
            <option value="EN">EN</option>
            </select>
            </div>

          {/* Sign In Section */}
          <div className={classes.signin}>
            <a href="#">
              <p>Sign In</p>
              <span>Account & Lists</span>
            </a>
          </div>

          {/* Returns & Orders Section */}
          <div className={classes.orders}>
            <a href="#">
              <p>Returns</p>
              <span>& Orders</span>
            </a>
          </div>

          {/* Cart Section */}
          <div className={classes.order_container}>
            <a href="#" className={classes.cart}>
              <BiCart size={35} />
              <span>0</span>
            </a>
          </div>
        </div>
      </section>
      <LowerHeader />
    </>
  );
};

export default Header;