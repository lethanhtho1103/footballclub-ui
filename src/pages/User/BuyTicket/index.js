import classNames from 'classnames/bind';
import style from './BuyTicket.module.scss';
import FooterUser from '~/components/User/FooterUser';
import HeaderUser from '~/components/User/HeaderUser';
import bg1 from '~/assets/images/bg1.webp';
import { baseUrl } from '~/axios';
import cityLogo from '~/assets/images/manchester_city.webp';
import { useEffect, useState } from 'react';
import { userService } from '~/services';
import { useParams } from 'react-router-dom';
import stadiumImage from '~/assets/images/stadium.jpg';
import { UilAngleRight, UilTimes } from '@iconscout/react-unicons';

const cx = classNames.bind(style);

function BuyTicket() {
  const [match, setMatch] = useState();
  const { game_id } = useParams();
  const [isShowSeats, setIsShowSeats] = useState(false);
  const [area, setArea] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const getOneMatch = async () => {
    const res = await userService.getOneMatch(game_id);
    setMatch(res.match);
  };

  function extractHourFromTimeString(timeString) {
    var dateObject = new Date('1970-01-01T' + timeString + 'Z');
    var hour = dateObject.getUTCHours();
    var minute = dateObject.getUTCMinutes();
    var formattedTime = (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' : '') + minute;
    return formattedTime;
  }
  const buttonArray = Array.from({ length: 200 }, (_, index) => 'E' + (index + 1));

  const getColorClass = (number) => {
    const numericPart = parseInt(number.slice(1));
    if (numericPart >= 1 && numericPart <= 100) {
      return 'group-1';
    } else if (numericPart >= 101 && numericPart <= 160) {
      return 'group-2';
    } else if (numericPart >= 161 && numericPart <= 200) {
      return 'group-3';
    }
  };

  const handleGetAllSeat = () => {
    setIsShowSeats(true);
    setArea(true);
  };

  const handleChangeSeat = (number) => {
    // Kiểm tra xem ghế đã được chọn chưa
    const isSeatSelected = selectedSeats.includes(number);
    // Nếu ghế đã được chọn, loại bỏ khỏi mảng selectedSeats
    if (isSeatSelected) {
      const updatedSeats = selectedSeats.filter((seat) => seat !== number);
      setSelectedSeats(updatedSeats);
    } else {
      // Nếu ghế chưa được chọn, thêm vào mảng selectedSeats
      setSelectedSeats([...selectedSeats, number]);
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
        <header className={cx('header')}>
          <div className={cx('background')}>
            <img src={bg1} alt="bg1"></img>
          </div>
          <div className={cx('wrapper')}>
            <div className={cx('competition')}>Premier League</div>
            <div className={cx('venue')}>
              <time>{match?.game_date}</time>
              <p>{match?.stadium.name} Stadium</p>
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
              <div
                className={cx('choose-area', {
                  choice: area === true,
                })}
                onClick={handleGetAllSeat}
              >
                <div className={cx('area')}>
                  <img src={stadiumImage} alt="" />
                  <div className={cx('info')}>
                    <div className={cx('firstLine')}>
                      <span>E</span>
                      <span>|</span>
                      <span>East stand</span>
                    </div>
                    <div className={cx('secondLine')}>
                      <span>from</span>
                      $13.65
                    </div>
                  </div>
                </div>
                <div className={cx('percent')}>
                  <span>35/100</span>
                  <UilAngleRight />
                </div>
              </div>
              <div className={cx('choose-area')}>
                <div className={cx('area')}>
                  <img src={stadiumImage} alt="" />
                  <div className={cx('info')}>
                    <div className={cx('firstLine')}>
                      <span>W</span>
                      <span>|</span>
                      <span>West stand</span>
                    </div>
                    <div className={cx('secondLine')}>
                      <span>from</span>
                      $13.65
                    </div>
                  </div>
                </div>
                <div className={cx('percent')}>
                  <span>35/100</span>
                  <UilAngleRight />
                </div>
              </div>
              <div className={cx('choose-area')}>
                <div className={cx('area')}>
                  <img src={stadiumImage} alt="" />
                  <div className={cx('info')}>
                    <div className={cx('firstLine')}>
                      <span>N</span>
                      <span>|</span>
                      <span>North bank</span>
                    </div>
                    <div className={cx('secondLine')}>
                      <span>from</span>
                      $13.65
                    </div>
                  </div>
                </div>
                <div className={cx('percent')}>
                  <span>35/100</span>
                  <UilAngleRight />
                </div>
              </div>
              <div className={cx('choose-area')}>
                <div className={cx('area')}>
                  <img src={stadiumImage} alt="" />
                  <div className={cx('info')}>
                    <div className={cx('firstLine')}>
                      <span>S</span>
                      <span>|</span>
                      <span>Block end</span>
                    </div>
                    <div className={cx('secondLine')}>
                      <span>from</span>
                      $13.65
                    </div>
                  </div>
                </div>
                <div className={cx('percent')}>
                  <span>35/100</span>
                  <UilAngleRight />
                </div>
              </div>
            </div>
            {isShowSeats ? (
              <div className={cx('map-seat')}>
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
                    <div className={cx('regular')}></div>
                    <span>Regular seats</span>
                  </div>
                  <div className={cx('note-item')}>
                    <div className={cx('vip')}></div>
                    <span>VIP seats</span>
                  </div>
                  <div className={cx('note-item')}>
                    <div className={cx('business')}></div>
                    <span>Business seats</span>
                  </div>
                </div>
                <div className={cx('button-container')}>
                  {buttonArray.map((number, index) => (
                    <button
                      key={number}
                      onClick={() => handleChangeSeat(number)}
                      className={cx('custom-button', {
                        regular: getColorClass(number) === 'group-1',
                        vip: getColorClass(number) === 'group-2',
                        business: getColorClass(number) === 'group-3',
                        choice: selectedSeats.includes(number),
                      })}
                    >
                      {number}
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
                            <span>{seat}</span>
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
                      <div className={cx('temporary')}>$18.92</div>
                    </div>
                    <button className={cx('btn-pay')}>Buy ticket</button>
                  </div>
                </div>
              </div>
            ) : (
              <div className={cx('stadium-image')}>
                <img src={stadiumImage} alt="" />
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
