import React from 'react';
import Rating from '@mui/material/Rating';
import classes from "./product.module.css"
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat';
import { Link } from 'react-router-dom';

function ProductCard ({ product, flex , renderDesc}) {
    if (!product || !product.rating) return null;
  const { image, title, id, rating, price, description } = product;
  return (
    <div className={`${classes.card__container} ${flex ? classes.product_flexed : ''}`}>
      <Link to={`/product/${id}`}>
        <img src={image} alt="" className={classes.image_container} />
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDesc && <div style={{ maxWidth: "750px"}}>{description}</div>}
        <div className={classes.rating}>
          <Rating value={rating.rate} precision={0.1}/>
          <small>{rating.count}</small>
        </div>
        <div><CurrencyFormat amount={price} /></div>
        <button className={classes.button}>
          Add to Cart
        </button>
      </div>
    </div>
  )
}
export default ProductCard