import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {

    const [orderData, setOrderData] = useState(null);
    const fetchMyOrder = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/myOrderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: localStorage.getItem('userEmail')
                })
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const responseData = await response.json();
            setOrderData(responseData);
        } catch (error) {
            console.error("Failed to fetch order data:", error);
        }
    };
    


    useEffect(() => {
        fetchMyOrder()
    }, []);

 
    return (
        <div>
            <Navbar />
            <div className='container'>
                <div className='row'>
                    {orderData && orderData.orderData ? orderData.orderData.order_data.slice(0).reverse().map((item, index) => (
                        item.map((arrayData, index) => (
                            <div key={index}>
                                {arrayData.Order_date ? (
                                    <div className='m-auto mt-5'>
                                        <div>{arrayData.Order_date}</div>
                                        <hr />
                                    </div>
                                ) : (
                                    <div className='col-12 col-md-6 col-lg-3'>
                                        <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                            <div className="card-body">
                                                <h5 className="card-title">{arrayData.name}</h5>
                                                <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                    <span className='m-1'>{arrayData.qty}</span>
                                                    <span className='m-1'>{arrayData.size}</span>
                                                    <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                        ₹{arrayData.price}/-
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    )) : <p>Loading...</p>}
                </div>
            </div>
            <Footer />
        </div>
    );
}
