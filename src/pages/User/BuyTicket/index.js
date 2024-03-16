import BuyTicketProvider from '~/Context/BuyTicketContext';
import BuyTicket from '~/components/User/BuyTicket';

function TicketPurchase() {
  return (
    <BuyTicketProvider>
      <BuyTicket />
    </BuyTicketProvider>
  );
}

export default TicketPurchase;
