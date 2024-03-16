import classNames from 'classnames/bind';
import style from './MyTicket.module.scss';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser } from '@fortawesome/free-regular-svg-icons';
import { faLocationDot, faPen, faSignature, faTicket } from '@fortawesome/free-solid-svg-icons';
import { useCallback, useContext, useEffect, useState } from 'react';
// import ModalDetailTicket from '~/components/ModalDetailTicket';
import { useNavigate } from 'react-router-dom';
import { InfoUserContext } from '~/Context/InfoUserContext';
import HeaderUser from '~/components/User/HeaderUser';
import FooterUser from '~/components/User/FooterUser';

const cx = classNames.bind(style);
function MyTicket() {
  const [allTickets, setAllTickets] = useState([]);
  const [detailTicket, setDetailTicket] = useState({});
  const [isShowModalDetailTicket, setIsShowModalDetailTicket] = useState(false);
  const { infoUser, isLogIn } = useContext(InfoUserContext);

  // const handleGetAllTicket = async () => {
  //   const userId = infoUser.id;
  //   const res = await filmService.getAllTicketRegister(userId);
  //   if (res.errCode === 0) {
  //     setAllTickets(res.data);
  //   }
  // };

  // function numberWithCommas(x) {
  //   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  // }

  // const handleShowModalTicket = (ticket) => {
  //   setIsShowModalDetailTicket(true);
  //   setDetailTicket(ticket);
  // };

  // const handleHiddenModalTicket = () => {
  //   setIsShowModalDetailTicket(false);
  // };

  const navigate = useNavigate();

  useEffect(() => {
    // handleGetAllTicket();
    if (!isLogIn) {
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={cx('wrapper')}>
      <HeaderUser />
      <Container>
        <Row className={cx('row')}>
          <Col md={3} className={cx('side-bar')}>
            <div className={cx('info-user')}>
              <div className={cx('user-avatar')}>{infoUser.name?.charAt(0)}</div>
              <div className={cx('user-name')}>
                <div>{infoUser.id}</div>
                <span>
                  <FontAwesomeIcon icon={faPen} />
                  <i>Sửa hồ sơ</i>
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
                <span>Tài khoản của tôi</span>
              </li>
              <li>
                <div className={cx('icon-ticket')}>
                  <FontAwesomeIcon icon={faTicket} />
                </div>
                <span className={cx('booked-tickets')}>Vé đã đặt</span>
              </li>
              <li>
                <div className={cx('icon-bell')}>
                  <FontAwesomeIcon icon={faBell} />
                </div>
                <span> Thông báo</span>
              </li>
            </ul>
          </Col>
          <Col md={9} className={cx('my-ticket')}>
            {allTickets.length === 0 ? (
              <div className={cx('no-ticket')}>
                <div className={cx('image')}></div>
                <div className={cx('title')}>Chưa có vé nào</div>
              </div>
            ) : (
              <>
                {/* {allTickets.map((ticket) => {
                  const handelTotalPrice = () => {
                    const initialValue = 0;
                    const sumWithInitial = ticket.detailListUser.reduce(
                      (accumulator, currentValue) =>
                        accumulator + currentValue.quantity * currentValue.detailCornWater.price,
                      initialValue,
                    );
                    return sumWithInitial;
                  };
                  return (
                    <div key={ticket.id} className={cx('list-ticket')}>
                      <div className={cx('ticket-item')}>
                        <div className={cx('info-web')}>
                          <div className={cx('location')}>
                            <a href="/">
                              <span>
                                <FontAwesomeIcon icon={faSignature} bounce />
                                NTF
                              </span>
                              Movie
                            </a>
                          </div>
                          <div className={cx('success')}>
                            <a
                              target="_blank"
                              href="https://www.google.com/maps/place/Tr%C6%B0%E1%BB%9Dng+%C4%90%E1%BA%A1i+h%E1%BB%8Dc+C%E1%BA%A7n+Th%C6%A1/@10.0299337,105.7706153,17z/data=!3m1!4b1!4m6!3m5!1s0x31a0895a51d60719:0x9d76b0035f6d53d0!8m2!3d10.0299337!4d105.7706153!16s%2Fm%2F02r6wmy?hl=vi-VN&entry=ttu"
                              className={cx('province')}
                              rel="northerner noreferrer"
                            >
                              <FontAwesomeIcon icon={faLocationDot} />
                              <span>Cần Thơ</span>
                            </a>
                            <div>
                              {ticket.status === 1 ? 'Hoàn Thành' : <span style={{ color: 'red' }}>Đã bị hủy</span>}
                            </div>
                          </div>
                        </div>
                        {ticket.status === 0 && (
                          <div className={cx('cancel-ticket')}>
                            Vì một số lý do kỹ thuật, lịch chiếu này đã bị hủy. Xin quý khách vui lòng đến trực tiếp
                            quầy vé để hoàn tiền hoặc giữ lại cho lần đặt vé kế tiếp. Xin chân thành xin lỗi!
                          </div>
                        )}
                        <div className={cx('info-ticket')}>
                          <a href={`details/${ticket.filmId}`}>
                            <img src={ticket.film.image} alt={ticket.film.name} />
                          </a>
                          <div className={cx('info-film')}>
                            <div className={cx('name')}>{ticket.film.name}</div>
                            <div className={cx('date')}>
                              <span>Ngày chiếu:</span> <div>{ticket.startDate}</div>
                            </div>
                            <div className={cx('date')}>
                              <span>Giờ chiếu:</span> <div>{ticket.startTime}</div>
                            </div>

                            <div className={cx('date')}>
                              <span>Phòng chiếu:</span> <div>0{ticket.roomId}</div>
                            </div>
                            <div className={cx('date')}>
                              <span>Số ghế:</span> <div>{ticket.seat}</div>
                            </div>
                          </div>
                        </div>
                        <div className={cx('total-amount')}>
                          <div>
                            <svg
                              width="16"
                              height="17"
                              viewBox="0 0 253 263"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <title>Shopee Guarantee</title>
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M126.5 0.389801C126.5 0.389801 82.61 27.8998 5.75 26.8598C5.08763 26.8507 4.43006 26.9733 3.81548 27.2205C3.20091 27.4677 2.64159 27.8346 2.17 28.2998C1.69998 28.7657 1.32713 29.3203 1.07307 29.9314C0.819019 30.5425 0.688805 31.198 0.689995 31.8598V106.97C0.687073 131.07 6.77532 154.78 18.3892 175.898C30.003 197.015 46.7657 214.855 67.12 227.76L118.47 260.28C120.872 261.802 123.657 262.61 126.5 262.61C129.343 262.61 132.128 261.802 134.53 260.28L185.88 227.73C206.234 214.825 222.997 196.985 234.611 175.868C246.225 154.75 252.313 131.04 252.31 106.94V31.8598C252.31 31.1973 252.178 30.5414 251.922 29.9303C251.667 29.3191 251.292 28.7649 250.82 28.2998C250.35 27.8358 249.792 27.4696 249.179 27.2225C248.566 26.9753 247.911 26.852 247.25 26.8598C170.39 27.8998 126.5 0.389801 126.5 0.389801Z"
                                fill="#ee4d2d"
                              ></path>
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M207.7 149.66L119.61 107.03C116.386 105.472 113.914 102.697 112.736 99.3154C111.558 95.9342 111.772 92.2235 113.33 88.9998C114.888 85.7761 117.663 83.3034 121.044 82.1257C124.426 80.948 128.136 81.1617 131.36 82.7198L215.43 123.38C215.7 120.38 215.85 117.38 215.85 114.31V61.0298C215.848 60.5592 215.753 60.0936 215.57 59.6598C215.393 59.2232 215.128 58.8281 214.79 58.4998C214.457 58.1705 214.063 57.909 213.63 57.7298C213.194 57.5576 212.729 57.4727 212.26 57.4798C157.69 58.2298 126.5 38.6798 126.5 38.6798C126.5 38.6798 95.31 58.2298 40.71 57.4798C40.2401 57.4732 39.7735 57.5602 39.3376 57.7357C38.9017 57.9113 38.5051 58.1719 38.1709 58.5023C37.8367 58.8328 37.5717 59.2264 37.3913 59.6604C37.2108 60.0943 37.1186 60.5599 37.12 61.0298V108.03L118.84 147.57C121.591 148.902 123.808 151.128 125.129 153.884C126.45 156.64 126.797 159.762 126.113 162.741C125.429 165.72 123.755 168.378 121.363 170.282C118.972 172.185 116.006 173.221 112.95 173.22C110.919 173.221 108.915 172.76 107.09 171.87L40.24 139.48C46.6407 164.573 62.3785 186.277 84.24 200.16L124.49 225.7C125.061 226.053 125.719 226.24 126.39 226.24C127.061 226.24 127.719 226.053 128.29 225.7L168.57 200.16C187.187 188.399 201.464 170.892 209.24 150.29C208.715 150.11 208.2 149.9 207.7 149.66Z"
                                fill="#fff"
                              ></path>
                            </svg>
                            Thành tiền:{' '}
                            <span>{numberWithCommas(handelTotalPrice() + ticket.ticket * ticket.priceTicket)} VND</span>
                          </div>
                          <Button className={cx('btn')} onClick={() => handleShowModalTicket(ticket)}>
                            Xem chi tiết
                          </Button>
                        </div>
                      </div>
                      {isShowModalDetailTicket && (
                        <ModalDetailTicket toggleX={handleHiddenModalTicket} detailTicket={detailTicket} />
                      )}
                    </div>
                  );
                })} */}
              </>
            )}
          </Col>
        </Row>
      </Container>
      <FooterUser />
    </div>
  );
}

export default MyTicket;
