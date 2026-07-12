import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import classes from "./productdetail.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProductCardComponent from "../../components/Product/ProductCardComponent";
import Loader from "../../components/Loader/Loader";
import { productUrl } from "../../Api/endPoints";

function ProductDetail() {
    const { productId } = useParams();
    const [product, setProduct] = useState({});
    const [isLoading, setLoading] = useState(false);
    
    useEffect(() => {
        setLoading(true);
        axios.get(`${productUrl}/products/${productId}`)
            .then((response) => {
                setProduct(response.data);
                setLoading(false);
            }).catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    return (
    <Layout>
        {isLoading ? (<Loader />) : (
            <ProductCardComponent product={product} 
            flex={true}
            renderDesc={true}
            renderAdd={true}
            />
        )}
    </Layout>
);
}

export default ProductDetail;