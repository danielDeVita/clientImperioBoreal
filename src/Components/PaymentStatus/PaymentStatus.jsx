import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PaymentStatus = () => {
    const [status, setStatus] = useState();

    const searchParams = new URLSearchParams(window.location.search);
    const paymentId = searchParams.get('payment_id');
    const orderId = localStorage.getItem("objectId");

    useEffect(() => {        
     async function fetchData() {
        const response = await axios.get(`mp/payment-status?payment_id=${paymentId}`)
        setStatus(response.data.message)
    }

     async function setOrderStatus(orderId, status) {
        try {
            if(status.length){
            let putStatus
            if(status === 'Compra aprobada') putStatus = 'Paid'
            if(status === 'Compra rechazada') putStatus = 'Cancelled'
            if(status === 'Compra pendiente') putStatus = 'InProcess'
            await axios.put(`/orders/${orderId}`, {putStatus})
            }
        } catch (error) {
            console.error(error)
        }
    }
        fetchData();
        setOrderStatus(orderId, status);
    }, [status]);
    
    
    return (
        <div>
            <h1>Estado de su compra</h1>
            <p>{status}</p>
        </div>
    );
};

export default PaymentStatus;