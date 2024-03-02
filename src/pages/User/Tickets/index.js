import classNames from 'classnames/bind';
import style from './Tickets.module.scss';
import FooterUser from '~/components/User/FooterUser';
import HeaderUser from '~/components/User/HeaderUser';
import premier from '~/assets/images/premier.webp';
import { useEffect, useState } from 'react';
import { userService } from '~/services';
import { baseUrl } from '~/axios';
import mancity from '~/assets/images/manchester_city.webp';
const cx = classNames.bind(style);

function Tickets() {
  const [matches, setMatches] = useState([]);
  const handleGetAllMatches = async () => {
    const res = await userService.getAllMatches();
    setMatches(res.matches);
  };

  function extractHourFromTimeString(timeString) {
    var dateObject = new Date('1970-01-01T' + timeString + 'Z');
    var hour = dateObject.getUTCHours();
    var minute = dateObject.getUTCMinutes();
    var formattedTime = (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' : '') + minute;
    return formattedTime;
  }

  useEffect(() => {
    handleGetAllMatches();
  }, []);
  return (
    <div>
      <HeaderUser />
      <main className={cx('main-content')}>
        <header className={cx('header')}>
          <div className={cx('banner')}>
            <h3>TICKETS</h3>
            <div className={cx('text')}>
              Buy official Manchester City tickets and hospitality experiences direct from the Club
            </div>
          </div>
          <div className={cx('ticket-filter')}>
            <h3 className={cx('title')}>Upcoming matches</h3>
            <div className={cx('filters')}>
              <div className={cx('filter-item')}>
                <div className={cx('label')}>Location</div>
                <select>
                  <option value="">All Locations</option>
                  <option value="1">Home</option>
                  <option value="0">Away</option>
                </select>
              </div>
              <div className={cx('filter-item')}>
                <div className={cx('btn-filter')}>Filter</div>
              </div>
            </div>
          </div>
        </header>
        <div className={cx('body')}>
          <div className={cx('container')}>
            <ul className={cx('list-match')}>
              {matches.map((match, index) => (
                <li className={cx('match-item')} key={index}>
                  <div className={cx('wrapper')}>
                    <div className={cx('heading')}>
                      <div className={cx('logo-premier')}>
                        <img src={premier} alt="Premier" />
                      </div>
                      <div className={cx('info')}>
                        <time>{match.game_date}</time>
                        <div>Premier League</div>
                        <div>{match.stadium.name} stadium</div>
                      </div>
                    </div>
                    <div className={cx('content')}>
                      <div
                        className={cx('wrapper', {
                          reverse: match.host === 1,
                        })}
                      >
                        <div className={cx('first')}>
                          <div className={cx('name')}>{match.club.name}</div>
                          <img src={`${baseUrl}${match.club.image}`} alt={match.club.name} />
                        </div>
                        <div className={cx('time')}>
                          <time>{extractHourFromTimeString(match.game_time)}</time>
                          <p>GMT</p>
                        </div>
                        <div className={cx('second')}>
                          <div className={cx('logo')}>
                            <img src={mancity} alt="man-city" />
                          </div>
                          <div className={cx('name')}>Manchester City</div>
                        </div>
                      </div>
                    </div>
                    <div className={cx('btn')}>
                      {match.host === 1 && <div className={cx('btn-buy')}>Buy now</div>}
                      {match.host === 1 ? (
                        <div className={cx('description')}>Tickets available</div>
                      ) : (
                        <div className={cx('description')}>Not available</div>
                      )}
                    </div>
                  </div>
                  <div className={cx('status')}>
                    <span
                      className={cx('bg-yellow', {
                        upcoming: true,
                      })}
                    ></span>
                    <div>{match.state}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <FooterUser />
    </div>
  );
}

export default Tickets;
