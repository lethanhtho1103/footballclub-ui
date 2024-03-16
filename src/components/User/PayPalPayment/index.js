import { PayPalButtons } from '@paypal/react-paypal-js';
import { useContext } from 'react';
import { BuyTicketContext } from '~/Context/BuyTicketContext';
import { InfoUserContext } from '~/Context/InfoUserContext';
import { userService } from '~/services';
function PayPalPayment({ cost, stand, game_id }) {
  const { infoUser, access_token } = useContext(InfoUserContext);
  const { handleClickX, selectedSeats, handleBuyTicketSuccess } = useContext(BuyTicketContext);
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

  const createTicket = async (user_id, stand, list_seats, game_id) => {
    try {
      const formData = new FormData();
      formData.append('user_id', user_id);
      formData.append('game_id', game_id);
      formData.append('stand', stand);
      list_seats.forEach((seat, index) => {
        formData.append(`list_seats[${index}]`, seat);
      });
      const res = await userService.createTicket(formData, access_token);
      if (res.message) {
        handleBuyTicketSuccess(res);
      }
    } catch (error) {
      console.log(error);
    }
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
      .then(() => {
        handleClickX();
        const listSeats = [];
        selectedSeats.forEach((element) => {
          listSeats.push(element.seat_id);
        });
        createTicket(infoUser.user_id, stand, listSeats, game_id);
      });
  };

  return <PayPalButtons createOrder={() => createOrder()} onApprove={(data) => onApprove(data)} />;
}

export default PayPalPayment;
