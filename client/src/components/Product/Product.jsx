import React, { useState, useEffect } from "react";
import ProductCardComponent from "./ProductCardComponent";
import axios from "axios";
import classes from "./product.module.css";


function Product() {
    const [products, setProducts] = useState([])
    const [isloading, setLoading] = useState(false);
    useEffect(() => {
        axios.get("https://fakestoreapi.com/products")
        .then((response) => {
            setProducts(response.data)
            setLoading(false)
        }).catch((err) => {
            console.log(err)
                setLoading(false)
        })
    }, [])
    return (
       <>
       {
            isloading ? (<loader />) : ( <section className={classes.product_container}>
            {
                products?.map((singleProduct) => {
                    return <ProductCardComponent product={singleProduct} key={singleProduct.id} />
                })
            }
        </section>   ) 
       }
       
       </>
    );
}
export default Product