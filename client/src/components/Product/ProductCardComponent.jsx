import React from 'react';
import Rating from '@mui/material/Rating';
import classes from "./product.module.css"
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat';

function ProductCard({ product }) {
  const { image, title, id, rating, price } = product;
  return (
    <div className={classes.card__container}>
      <a href="">
        <img src={image} alt="" />
      </a>
      <div>
        <h3>{title}</h3>
        <div className={classes.rating}>
          {/* rating */}
          <Rating value={rating.rate} precision={0.1}/>
          {/* count */}
          <small>{rating.count}</small>
        </div>
        <div><CurrencyFormat productId={id} /></div>
        <button className={classes.button}>
          Add to Cart
        </button>
      </div>
    </div>
  )
}
export default ProductCard