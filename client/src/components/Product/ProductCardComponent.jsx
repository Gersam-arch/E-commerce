import React, { useContext } from 'react';
import Rating from '@mui/material/Rating';
import classes from "./product.module.css";
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat';
import { Link } from 'react-router-dom';
import { Type } from '../../Utility/action.type';
import { DataContext } from '../DataProvider/DataProvider';

function ProductCard({ product, flex, renderDesc, renderAdd }) {
  const [, dispatch] = useContext(DataContext);

  if (!product || !product.rating) return null;

  const { image, title, id, rating, price, description } = product;


  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: { image, title, id, rating, price, description }
    });
  };

  return (
    <div className={`${classes.card__container} ${flex ? classes.product_flexed : ''}`}>
      <Link to={`/product/${id}`}>
        <img src={image} alt="" className={classes.image_container} />
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDesc && <div style={{ maxWidth: "750px" }}>{description}</div>}
        <div className={classes.rating}>
          <Rating value={rating.rate} precision={0.1} />
          <small>{rating.count}</small>
        </div>
        <div><CurrencyFormat productId={id} /></div>
        {
          renderAdd && <button className={classes.button} onClick={addToCart}>
          Add to Cart
        </button>
        }
        
      </div>
    </div>
  );
}

export default ProductCard;