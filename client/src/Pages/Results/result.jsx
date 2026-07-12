import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import ProductCardComponent from "../../components/Product/ProductCardComponent";
import Loader from "../../components/Loader/Loader";
import classes from "../../components/Product/product.module.css";

function Result() {
    const [results, setResults] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const { categoryName } = useParams();

    useEffect(() => {
        setLoading(true);
        axios.get(`${productUrl}/products/category/${categoryName}`)
        .then((res) => {
            setResults(res.data);
            setLoading(false);
        }).catch((err) => {
            console.log(err);
            setLoading(false);
        });
    }, []);

    return (
        <Layout>
            <section>
                <h1 style={{ padding: "30px"}}>Results</h1>
                <p style={{ padding: "30px"}}>Category / {categoryName}</p>
                <hr/>
                {isLoading ? (<Loader />) : (
                    <div className={classes.product_container}>
                        {results.map((product) => (
                            <ProductCardComponent
                                key={product.id}
                                product={product}
                                renderDesc={false}
                                renderAdd={true}
                                
                            />
                        ))}
                    </div>
                )}
            </section>
        </Layout>
    );
}

export default Result;