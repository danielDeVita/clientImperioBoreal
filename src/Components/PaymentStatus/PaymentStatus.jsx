import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PaymentStatus = () => {
    const [status, setStatus] = useState('');

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const paymentId = searchParams.get('payment_id');

        async function fetchData() {
            let response = await axios(`/payment-status?payment_id=${paymentId}`)
            let algo = response.data
            setStatus(algo)
            console.log(algo)
        }
        fetchData()
    }, [window.location.search]);

    return (
        <div>
            <h1>Payment Status</h1>
            <p>{status}</p>
        </div>
    );
};

export default PaymentStatus;