import React, { useState } from 'react';
import axios from 'axios';

const PaypalPaymentComponent = () => {
    const [response, setResponse] = useState(null);

    const handlePayment = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/paypal', {
                price: 100 // Thay thế 100 bằng giá trị thực tế của thanh toán
            });
            console.log(response.data);
            setResponse(response.data);
            
            // Calculate the position to center the popup window
            const width = 350;
            const height = 500;
            const left = (window.innerWidth - width) / 2;
            const top = (window.innerHeight - height) / 2;

            // Open a new popup window with the approval_url
            const popup = window.open(response.data.approval_url, '_blank', `width=${width},height=${height},left=${left},top=${top}`);
            if (popup) {
                popup.focus(); // Focus on the new popup window
            } else {
                alert('Please allow popups for this website');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <button onClick={handlePayment}>Proceed to Payment</button>
            {response && <p>{response.message}</p>}
        </div>
    );
};

export default PaypalPaymentComponent;
