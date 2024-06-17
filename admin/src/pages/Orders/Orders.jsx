/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import './Orders.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {
    const [orders, setOrders] = useState([]);

    const fetchAllOrders = async () => {
        try {
            const response = await axios.get(url + "/api/order/list");
            console.log('Fetch All Orders Response:', response); // Debugging statement
            if (response.data.success) {
                setOrders(response.data.data);
            } else {
                toast.error("Error fetching orders");
            }
        } catch (error) {
            toast.error("Error fetching orders");
            console.error("Fetch All Orders Error:", error);
        }
    };

    const statusHandler = async (e, orderId) => {
        const newStatus = e.target.value;
        try {
            const response = await axios.post(url + "/api/order/status", {
                orderId,
                status: newStatus
            });

            // Check response data and status
            if (response.data && response.data.success) {
                await fetchAllOrders();
            } else {
                toast.error("Error updating order status");
            }
        } catch (error) {
            toast.error("Error updating order status");
        }
    };


    useEffect(() => {
        fetchAllOrders();
    }, []);

    return (
        <div className='order add'>
            <h3>Order Page</h3>
            <div className='order-list'>
                {orders.map((order, index) => (
                    <div key={index} className='order-item'>
                        <img src={assets.parcel_icon} alt='' />
                        <div>
                            <p className='order-item-food'>
                                {order.items.map((item, idx) => (
                                    <span key={idx}>
                                        {item.name} x {item.quantity}{idx < order.items.length - 1 && ', '}
                                    </span>
                                ))}
                            </p>
                            <p className='order-item-name'>{order.address.firstName} {order.address.lastName}</p>
                            <div className='order-item-address'>
                                <p>{order.address.street},</p>
                                <p>{order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
                            </div>
                            <p className='order-item-phone'>{order.address.phone}</p>
                        </div>
                        <p>Items: {order.items.length}</p>
                        <p>₹ {order.amount}</p>
                        <select onChange={(e) => statusHandler(e, order._id)} value={order.status}>
                            <option value="Food Processing">Food Processing</option>
                            <option value="Waiting for Order to pick up">Waiting for Order to pick up</option>
                            <option value="Out for delivery">Out for delivery</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;
