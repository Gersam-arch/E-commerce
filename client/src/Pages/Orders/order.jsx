import React, { useState, useEffect, useContext } from "react";
import Layout from "../../components/Layout/Layout";
import { db } from "../../Utility/firebase";
import { DataContext } from "../../components/DataProvider/DataProvider";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";

function Order() {
    const [{ user }] = useContext(DataContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (user) {
            const q = query(
                collection(db, "users", user.uid, "orders"),
                orderBy("created", "desc")
            );
            const unsubscribe = onSnapshot(q, (snapshot) => {
                setOrders(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                );
            });
            return () => unsubscribe();
        } else {
            setOrders([]);
        }
    }, [user]);

    return (
        <Layout>
            <section style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
                <h2 style={{ marginBottom: "20px" }}>Your Orders</h2>

                {orders.length === 0 ? (
                    <p style={{ padding: "20px", color: "#555" }}>
                        You don't have any orders yet. Please make an order to see it here.
                    </p>
                ) : (
                    orders.map((eachOrder) => (
                        <div key={eachOrder.id} style={{
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            padding: "16px",
                            marginBottom: "16px"
                        }}>
                            <hr />
                            <p style={{ fontSize: "0.85rem", color: "#888" }}>
                                Order ID: <strong>{eachOrder.id}</strong>
                            </p>
                            <p style={{ fontSize: "0.85rem", color: "#888" }}>
                                Ref: <strong>{eachOrder.data?.tx_ref}</strong>
                            </p>

                            {eachOrder.data?.basket?.map((item) => (
                                <div key={item.id} style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "16px",
                                    padding: "12px 0",
                                    borderBottom: "1px solid #f0f0f0"
                                }}>
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        style={{ width: "80px", objectFit: "contain" }}
                                    />
                                    <div style={{ flex: 1 }}>
                                        <p style={{ fontWeight: 600 }}>{item.title}</p>
                                        <p style={{ color: "#555" }}>Qty: {item.amount}</p>
                                    </div>
                                    <CurrencyFormat amount={item.price * item.amount} />
                                </div>
                            ))}

                            <div style={{ textAlign: "right", marginTop: "12px", fontWeight: 700 }}>
                                Total: <CurrencyFormat amount={eachOrder.data?.amount} />
                            </div>
                        </div>
                    ))
                )}
            </section>
        </Layout>
    );
}

export default Order;