import React from "react";
import Layout from "../../components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import ProductCard from "../../components/Product/ProductCardComponent";
import classes from "../../components/Product/product.module.css";
function Result() {
    const [results, setResults] = React.useState([]);
    const { categoryName } = useParams();
    React.useEffect(() => {

        axios.get(`${productUrl}/products/category/${categoryName}`)
        .then((res) => {
            setResults(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }, []);

    return (
        <Layout>
    <section>
        <h1 style={{ padding: "30px"}}>Results</h1>
        <p style={{ padding: "30px"}}>Category / {categoryName}</p>
        <hr/>
            <div className={classes.product_container}>
                {results.map((product) => (
                    <ProductCard
                        key={product.id}

                        product={product}
                    />
                ))}
            </div>
    </section>
        </Layout>
    );
}

export default Result;
