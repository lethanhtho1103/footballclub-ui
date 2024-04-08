import classNames from 'classnames/bind';
import style from './ModalDetailTicket.module.scss';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import TicketUser from '~/components/User/TicketUser';
import { userService } from '~/services';
import noTickets from '~/assets/images/no-tickets.png';
import Loader from '~/components/Loader';
const cx = classNames.bind(style);

function ModalDetailTicket({ toggleX, userId }) {
  const [isHidden, setIsHidden] = useState(false);
  const [allTicketPurchases, setAllTicketPurchases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const handleMouseLeave = () => {
    setIsHidden(true);
  };
  const handelClickHidden = () => {
    if (isHidden) {
      toggleX();
    }
  };
  const handleClickX = () => {
    toggleX();
  };

  const handleGetAllTicketPurchase = async () => {
    const res = await userService.getAllTicketPurchases(userId);
    if (res.tickets) {
      setAllTicketPurchases(res.tickets);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetAllTicketPurchase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <div onClick={handelClickHidden} className={cx('wrap')}>
      <div onMouseLeave={handleMouseLeave} className={cx('ticket')}>
        <Button className={cx('exit')} onClick={handleClickX}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
            className="h-6 w-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </Button>
        {isLoading ? ( // Kiểm tra isLoading để hiển thị tiêu đề tạm thời
          <Loader />
        ) : allTicketPurchases?.length > 0 ? (
          allTicketPurchases.map((ticket) => <TicketUser key={ticket.id} ticket={ticket} />)
        ) : (
          <div className={cx('no-ticket')}>
            <img src={noTickets} alt="Img" />
            <span>No tickets</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ModalDetailTicket;
