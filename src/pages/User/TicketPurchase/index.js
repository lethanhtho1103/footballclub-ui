import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import BuyTicketProvider from '~/Context/BuyTicketContext';
import BuyTicket from '~/components/User/BuyTicket';

function TicketPurchase() {
  const initialOptions = {
    clientId: 'AfVjnZ4-R2on3PtjIwjuRrC-Sj-Pxgtdem6J1Xo0S7Eqv1VPyG1DbIVB7ZiytEOz4BL8j7quD5mGhvI1',
    currency: 'USD',
    intent: 'capture',
  };
  return (
    <BuyTicketProvider>
      <PayPalScriptProvider options={initialOptions}>
        <BuyTicket />
      </PayPalScriptProvider>
    </BuyTicketProvider>
  );
}

export default TicketPurchase;
