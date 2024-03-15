import React from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';

function PayPalPayment({ cost, handleClickX }) {
  const serverUrl = 'http://localhost:8000';
  const createOrder = () => {
    return fetch(`${serverUrl}/api/paypal`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ticket: {
          cost: cost,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => data.orderId);
  };
  
  const onApprove = (data) => {
    return fetch(`${serverUrl}/api/success`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: data.orderID,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        handleClickX();
        console.log(data);
        alert('Payment successful');
      });
  };

  return (
    <PayPalButtons
      createOrder={() => createOrder()}
      onApprove={(data) => onApprove(data)}
    />
  );
}

export default PayPalPayment;
