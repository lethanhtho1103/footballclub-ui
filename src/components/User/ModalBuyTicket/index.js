import classNames from 'classnames/bind';
import style from './ModelBuyTicket.module.scss';
import { Button } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { baseUrl } from '~/axios';
import cityLogo from '~/assets/images/manchester_city.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import PayPalPayment from '~/components/User/PayPalPayment';
import { BuyTicketContext } from '~/Context/BuyTicketContext';

const cx = classNames.bind(style);

function ModalBuyTicket({ match, calculateTotalPrice, stand, game_id }) {
  const { extractHourFromTimeString, selectedSeats, handleClickX } = useContext(BuyTicketContext);
  const [isHidden, setIsHidden] = useState(false);

  const handleMouseLeave = () => {
    setIsHidden(true);
  };

  const handelClickHidden = () => {
    if (isHidden) {
      handleClickX();
    }
  };

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
        <div className={cx('info-ticket')}>
          <div className={cx('info-match')}>
            <div className={cx('header-match')}>
              <div className={cx('fixture')}>
                <div className={cx('first')}>
                  <div className={cx('name')}>Manchester City</div>
                  <div className={cx('logo')}>
                    <img src={cityLogo} alt="man-city" />
                  </div>
                </div>
                <div className={cx('vs')}>VS</div>
                <div className={cx('second')}>
                  <img src={`${baseUrl}${match?.club.image}`} alt={match?.club.name} />
                  <div className={cx('name')}>{match?.club.name}</div>
                </div>
              </div>
            </div>
            <ul className={cx('body-match')}>
              <li className={cx('body-match-item')}>
                <div>
                  <span>TIME</span>
                  <div>
                    <b>{extractHourFromTimeString(match?.game_time)}</b>
                  </div>
                </div>
              </li>
              <li className={cx('body-match-item')}>
                <div>
                  <span>DATE</span>
                  <div>
                    <b>{match?.game_date}</b>
                  </div>
                </div>
              </li>
              <li className={cx('body-match-item', 'stadium')}>
                <div>
                  <span>STADIUM</span>
                </div>
              </li>
              <li className={cx('body-match-item')}>
                <div>
                  <div className={cx('name-province')}>
                    <a
                      target="_blank"
                      href="https://www.google.com/maps/place/S%C3%A2n+v%E1%BA%ADn+%C4%91%E1%BB%99ng+Th%C3%A0nh+ph%E1%BB%91+Manchester/@53.4831633,-2.2052445,17z/data=!3m1!4b1!4m6!3m5!1s0x487bb10dcc950ae3:0x549a8dcce67a876a!8m2!3d53.4831634!4d-2.2003736!16zL20vMDJueWNi?hl=vi-VN&entry=ttu"
                      className={cx('province')}
                      rel="northerner noreferrer"
                    >
                      <FontAwesomeIcon icon={faLocationDot} />
                      <span>Etihad</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className={cx('body-match-item', 'address')}>
                <div>
                  <div className={cx('description')}>
                    Etihad Stadium, Ashton New Rd, Manchester M11 3FF, Vương quốc Anh
                  </div>
                </div>
              </li>
              <li className={cx('body-match-item')}>
                <div>
                  <span>SEATS</span>
                  <div>
                    <b className={cx('list-seat')}>
                      {selectedSeats.map((seat, index) => (
                        <>
                          <span>{seat.seat_id}</span>
                          {index !== selectedSeats.length - 1 && <span>,&nbsp;</span>}
                        </>
                      ))}
                    </b>
                  </div>
                </div>
              </li>
              <li className={cx('body-match-item')}>
                <div></div>
                <div>
                  <div>
                    <b>${calculateTotalPrice(selectedSeats)}</b>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <ul>
            <li>
              <div>
                <div>
                  <span>Provisional</span>
                </div>
              </div>
              <div>
                <b>${calculateTotalPrice(selectedSeats)}</b>
              </div>
            </li>
            {/* <li>
              <div>
                <div>
                  <span>Change</span>
                </div>
              </div>
              <div>
                <b>$12.65</b>
              </div>
            </li> */}
            <li>
              <div>
                <div>
                  <span>Pay</span>
                </div>
              </div>
              <div>
                <b className={cx('color-red')}>$15.45</b>
              </div>
            </li>
          </ul>
        </div>
        <div className={cx('payment')}>
          <div className={cx('paypal')}>
            <h2>Pay with PayPal</h2>
            <PayPalPayment cost={calculateTotalPrice(selectedSeats)} stand={stand} game_id={game_id} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalBuyTicket;
