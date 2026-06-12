import React from 'react'
import { SlLocationPin } from 'react-icons/sl'
import { BsSearch } from 'react-icons/bs'
import { BiCart } from 'react-icons/bi'
import { TbWorld } from 'react-icons/tb'
import classes from './Header.module.css'
import LowerHeader from './LowerHeader'

const Header = () => {
  return (
    <>
      <section>
        <div className={classes.header_container}>

          {/* Logo */}
          <div className={classes.logo_container}>
            <a href="/">
              <div className={classes.logo_box}>
                <BiCart size={22} color="white" />
              </div>
              <div className={classes.logo_text}>
                <span className={classes.logo_shop}>Shop</span>
                <span className={classes.logo_hub}>Hub</span>
                <div className={classes.logo_sub}>STORE</div>
              </div>
            </a>
          </div>

          {/* Delivery Location */}
          <div className={classes.delivery}>
            <SlLocationPin color="#4EA8DE" />
            <div>
              <p>Delivered to</p>
              <span>Ethiopia</span>
            </div>
          </div>

          {/* Search */}
          <div className={classes.search}>
            <select name="category">
              <option value="All">All</option>
              <option value="electronics">Electronics</option>
              <option value="jewelery">Jewellery</option>
              <option value="men's clothing">Men's Clothing</option>
              <option value="women's clothing">Women's Clothing</option>
            </select>
            <input
              type="text"
              placeholder="Search ShopHub..."
            />
            <button className={classes.search_icon}>
              <BsSearch size={20} color="white" />
            </button>
          </div>

          {/* Language */}
          <div className={classes.language}>
            <TbWorld size={18} color="white" />
            <select>
              <option value="EN">EN</option>
            </select>
          </div>

          {/* Sign In */}
          <div className={classes.signin}>
            <a href="/login">
              <p>Hello, Guest</p>
              <span>Account & Lists</span>
            </a>
          </div>

          {/* Returns & Orders */}
          <div className={classes.orders}>
            <a href="/orders">
              <p>Returns</p>
              <span>& Orders</span>
            </a>
          </div>

          {/* Cart */}
          <div className={classes.order_container}>
            <a href="/cart" className={classes.cart}>
              <div className={classes.cart_icon_wrap}>
                <BiCart size={32} color="white" />
                <span className={classes.cart_count}>0</span>
              </div>
              <p>Cart</p>
            </a>
          </div>

        </div>
      </section>
      <LowerHeader />
    </>
  )
}

export default Header