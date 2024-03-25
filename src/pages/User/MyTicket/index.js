import classNames from 'classnames/bind';
import style from './MyTicket.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser } from '@fortawesome/free-regular-svg-icons';
import { faPen, faTicket } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { InfoUserContext } from '~/Context/InfoUserContext';
import HeaderUser from '~/components/User/HeaderUser';
import FooterUser from '~/components/User/FooterUser';
import { userService } from '~/services';
import TicketUser from '~/components/User/TicketUser';

const cx = classNames.bind(style);
function MyTicket() {
  const [allTicketPurchases, setAllTicketPurchases] = useState([]);

  const { infoUser, isLogIn } = useContext(InfoUserContext);

  const handleGetAllTicketPurchase = async () => {
    const res = await userService.getAllTicketPurchases(infoUser.user_id);
    console.log(res.tickets);
    if (res.tickets) {
      setAllTicketPurchases(res.tickets);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogIn) {
      navigate('/login');
    }
    handleGetAllTicketPurchase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoUser.user_id]);
  return (
    <div className={cx('wrapper')}>
      <HeaderUser />
      <main className={cx('content')}>
        <Container>
          <Row className={cx('row')}>
            <Col md={3} className={cx('side-bar')}>
              <div className={cx('info-user')}>
                <div className={cx('user-avatar')}>{infoUser.name?.charAt(0)}</div>
                <div className={cx('user-name')}>
                  <div>{infoUser.id}</div>
                  <span>
                    <FontAwesomeIcon icon={faPen} />
                    <i>Edit profile</i>
                  </span>
                </div>
              </div>
              <div className={cx('user-money-refund')}>
                {/* <span>Số tiền còn thừa:&nbsp;&nbsp;</span> {numberWithCommas(infoUser.moneyRefund)} VND */}
              </div>
              <ul className={cx('menu-bar')}>
                <li>
                  <div className={cx('icon-user')}>
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                  <span>My account</span>
                </li>
                <li>
                  <div className={cx('icon-ticket')}>
                    <FontAwesomeIcon icon={faTicket} />
                  </div>
                  <span className={cx('booked-tickets')}>Booked tickets</span>
                </li>
                <li>
                  <div className={cx('icon-bell')}>
                    <FontAwesomeIcon icon={faBell} />
                  </div>
                  <span>Notification</span>
                </li>
              </ul>
            </Col>
            <Col md={9} className={cx('my-ticket')}>
              {allTicketPurchases?.length === 0 ? (
                <div className={cx('no-ticket')}>
                  <div className={cx('image')}></div>
                  <div className={cx('title')}>Chưa có vé nào</div>
                </div>
              ) : (
                <>
                  {allTicketPurchases.map((ticket, index) => (
                    <TicketUser ticket={ticket} />
                  ))}
                </>
              )}
            </Col>
          </Row>
        </Container>
      </main>
      <FooterUser />
    </div>
  );
}

export default MyTicket;
