import classNames from 'classnames/bind';
import style from './BuyTicket.module.scss';
import FooterUser from '~/components/User/FooterUser';
import HeaderUser from '~/components/User/HeaderUser';
import bg1 from '~/assets/images/bg.jpg';
import { baseUrl } from '~/axios';
import cityLogo from '~/assets/images/manchester_city.webp';
import { useContext, useEffect, useState } from 'react';
import { userService } from '~/services';
import { useNavigate, useParams } from 'react-router-dom';
import stadiumImage from '~/assets/images/stadium.jpg';
import { UilAngleRight, UilTimes } from '@iconscout/react-unicons';
import ModalBuyTicket from '~/components/User/ModalBuyTicket';
import Loader from '~/components/Loader';
import { InfoUserContext } from '~/Context/InfoUserContext';
import ToastMassage from '~/components/Admin/ToastMassage';
import { BuyTicketContext } from '~/Context/BuyTicketContext';
const cx = classNames.bind(style);

function BuyTicket() {
  const {
    selectedSeats,
    isShowSeats,
    obToast,
    isShowModalBuyTicket,
    setIsShowSeats,
    setObToast,
    setIsShowModalBuyTicket,
    extractHourFromTimeString,
    setSelectedSeats,
  } = useContext(BuyTicketContext);
  const { infoUser } = useContext(InfoUserContext);
  const [match, setMatch] = useState();
  const [isLoader, setIsLoader] = useState(false);
  const { game_id } = useParams();

  const [isShowRequiredChoiceSeats, setIsShowRequiredChoiceSeats] = useState(false);

  const [area, setArea] = useState('');
  const [seats, setSeats] = useState([]);

  const navigate = useNavigate();

  const seatData = [
    { id: 'east', label: 'East stand', stand: 'E', price: '$6', percent: '35/400' },
    { id: 'west', label: 'West stand', stand: 'W', price: '$7.5', percent: '22/400' },
    { id: 'north', label: 'North bank', stand: 'N', price: '$8.35', percent: '56/400' },
    { id: 'block', label: 'Block end', stand: 'S', price: '$13.65', percent: '32/400' },
  ];

  const getOneMatch = async () => {
    const res = await userService.getOneMatch(game_id);
    setMatch(res?.match);
  };

  const getColorClass = (type) => {
    if (type === 'Normal') {
      return 'Normal';
    } else if (type === 'VIP') {
      return 'VIP';
    } else if (type === 'VVIP') {
      return 'VVIP';
    }
  };

  const handleShowSeatsOfArea = async (stand) => {
    setIsLoader(true);
    setArea(stand);
    setTimeout(async () => {
      setIsShowSeats(true);
      const res = await userService.getAllSeats(game_id, stand);
      setSeats(res.seats);
      setIsLoader(false);
    }, 500);
  };

  const handleChangeSeat = (seatObject) => {
    const selectedSeatIndex = selectedSeats.findIndex((seat) => seat.seat_number === seatObject.seat_number);
    if (selectedSeatIndex !== -1) {
      const updatedSeats = [...selectedSeats];
      updatedSeats.splice(selectedSeatIndex, 1);
      setSelectedSeats(updatedSeats);
    } else {
      setSelectedSeats([...selectedSeats, seatObject]);
    }
  };

  const calculateTotalPrice = (seats) => {
    const totalPrice = seats.reduce((sum, seat) => sum + parseFloat(seat.price), 0);
    return totalPrice.toFixed(2);
  };

  const handleShowModalBuyTicket = () => {
    if (selectedSeats.length > 0 && infoUser.name) {
      setIsShowModalBuyTicket(true);
    } else if (selectedSeats.length === 0) {
      setIsShowRequiredChoiceSeats(true);
      setTimeout(() => setIsShowRequiredChoiceSeats(false), 3000);
    } else {
      setIsLoader(true);
      setTimeout(() => navigate('/login'), 500);
    }
  };

  useEffect(() => {
    getOneMatch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game_id]);
  return (
    <div>
      <HeaderUser />
      <main className={cx('main-content')}>
        {obToast?.content?.length > 0 && (
          <ToastMassage
            isShow={obToast.show}
            content={obToast.content}
            handleClose={() => setObToast({ content: '' })}
          />
        )}
        {isShowModalBuyTicket && (
          <ModalBuyTicket match={match} calculateTotalPrice={calculateTotalPrice} stand={area} game_id={game_id} />
        )}
        {isLoader && <Loader />}
        <header className={cx('header')}>
          <div className={cx('background')}>
            <img src={bg1} alt="bg1"></img>
          </div>
          <div className={cx('wrapper')}>
            <div className={cx('competition')}>Premier League</div>
            <div className={cx('venue')}>
              <time>{match?.game_date}</time>
              <p>{match?.stadium.name}</p>
            </div>
            <div className={cx('fixture')}>
              <div className={cx('first')}>
                <div className={cx('name')}>Manchester City</div>
                <div className={cx('logo')}>
                  <img src={cityLogo} alt="man-city" />
                </div>
              </div>
              <div className={cx('time')}>
                <time>{extractHourFromTimeString(match?.game_time)}</time>
                <p>GMT</p>
              </div>
              <div className={cx('second')}>
                <img src={`${baseUrl}${match?.club.image}`} alt={match?.club.name} />
                <div className={cx('name')}>{match?.club.name}</div>
              </div>
            </div>
          </div>
        </header>
        <div className={cx('body')}>
          <div className={cx('container')}>
            <div className={cx('sidebar')}>
              <h3 className={cx('title')}>Choose by area</h3>
              {seatData.map((data, index) => (
                <div
                  key={index}
                  className={cx('choose-area', {
                    choice: area === data.stand,
                  })}
                  onClick={() => handleShowSeatsOfArea(data.stand)}
                >
                  <div className={cx('area')}>
                    <img src={stadiumImage} alt="" />
                    <div className={cx('info')}>
                      <div className={cx('firstLine')}>
                        <span>{data.stand}</span>
                        <span>|</span>
                        <span>{data.label}</span>
                      </div>
                      <div className={cx('secondLine')}>
                        <span>from</span>
                        {data.price}
                      </div>
                    </div>
                  </div>
                  <div className={cx('percent')}>
                    <span>{data.percent}</span>
                    <UilAngleRight />
                  </div>
                </div>
              ))}
            </div>
            {isShowSeats ? (
              <div className={cx('map-seat')}>
                {isShowRequiredChoiceSeats && (
                  <div className={cx('required')}>
                    <div>Please choose at least 1 seat.</div>
                    <div className={cx('icon')} onClick={() => setIsShowRequiredChoiceSeats(false)}>
                      <UilTimes />
                    </div>
                  </div>
                )}
                <h3>Choose a seat to watch football</h3>
                <div className={cx('list-note')}>
                  <div className={cx('note-item')}>
                    <div className={cx('placed')}></div>
                    <span>Seats booked</span>
                  </div>
                  <div className={cx('note-item')}>
                    <div className={cx('choice')}></div>
                    <span>Seat of your choice</span>
                  </div>
                  <div className={cx('note-item')}>
                    <div className={cx('normal')}></div>
                    <span>Normal seats</span>
                  </div>
                  <div className={cx('note-item')}>
                    <div className={cx('vip')}></div>
                    <span>VIP seats</span>
                  </div>
                  <div className={cx('note-item')}>
                    <div className={cx('vvip')}></div>
                    <span>VVIP seats</span>
                  </div>
                </div>
                <div className={cx('button-container')}>
                  {seats.map((seat, index) => (
                    <button
                      key={seat.seat_id}
                      onClick={() => handleChangeSeat(seat)}
                      className={cx('custom-button', {
                        normal: getColorClass(seat.type) === 'Normal',
                        vip: getColorClass(seat.type) === 'VIP',
                        vvip: getColorClass(seat.type) === 'VVIP',
                        placed: seat.ticket_id !== null,
                        choice: selectedSeats.some((selectedSeat) => selectedSeat.seat_id === seat.seat_id),
                      })}
                      disabled={seat.ticket_id !== null}
                    >
                      {seat.seat_id}
                    </button>
                  ))}
                </div>
                <div className={cx('buy-ticket')}>
                  <div className={cx('seat-choice')}>
                    <div className={cx('label')}>Seating</div>
                    {selectedSeats.length > 0 && (
                      <div className={cx('list-seat')}>
                        {selectedSeats.map((seat, index) => (
                          <div className={cx('seat-item')}>
                            <span>{seat.seat_id}</span>
                            {index !== selectedSeats.length - 1 && <span>,&nbsp;</span>}
                          </div>
                        ))}
                        <div className={cx('delete')} onClick={() => setSelectedSeats([])}>
                          <UilTimes />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className={cx('payment')}>
                    <div className={cx('label')}>
                      <span>Temporary</span>
                      <div className={cx('temporary')}>${calculateTotalPrice(selectedSeats)}</div>
                    </div>
                    <button className={cx('btn-pay')} onClick={handleShowModalBuyTicket}>
                      Buy now
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className={cx('stadium-image')}>
                <img src="https://www.seekpng.com/png/full/58-586729_man-city-seating-plan.png" alt="" />
              </div>
            )}
          </div>
        </div>
      </main>
      <FooterUser />
    </div>
  );
}

export default BuyTicket;
