import classNames from 'classnames/bind';
import style from './Tickets.module.scss';
import FooterUser from '~/components/User/FooterUser';
import HeaderUser from '~/components/User/HeaderUser';
import premier from '~/assets/images/premier.webp';
import { useEffect, useState } from 'react';
import { userService } from '~/services';
import { baseUrl } from '~/axios';
import cityLogo from '~/assets/images/manchester_city.webp';
import Loader from '~/components/Loader';
const cx = classNames.bind(style);

function Tickets() {
  const [isLoader, setIsLoader] = useState(false);
  const [matches, setMatches] = useState([]);
  const [state, setState] = useState(2);

  const handleGetAllMatches = async () => {
    const res = await userService.getAllMatchesComingUp();
    const upcomingMatches = res.upcoming_matches.sort((a, b) => {
      const dateA = new Date(`${a.game_date}T${a.game_time}`);
      const dateB = new Date(`${b.game_date}T${b.game_time}`);
      return dateA - dateB;
    });
    if (state === 2) {
      setMatches(upcomingMatches);
    } else {
      const filteredMatches = upcomingMatches.filter((match) => {
        return match.host === state;
      });
      setMatches(filteredMatches);
    }
  };

  function extractHourFromTimeString(timeString) {
    var dateObject = new Date('1970-01-01T' + timeString + 'Z');
    var hour = dateObject.getUTCHours();
    var minute = dateObject.getUTCMinutes();
    var formattedTime = (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' : '') + minute;
    return formattedTime;
  }

  const handleFilterStadium = () => {
    setIsLoader(true);
    setTimeout(() => {
      handleGetAllMatches();
      setIsLoader(false);
    }, 500);
  };

  useEffect(() => {
    handleGetAllMatches();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      {isLoader && <Loader />}
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
                <select onChange={(e) => setState(Number(e.target.value))}>
                  <option value="2">All Locations</option>
                  <option value="1">Home</option>
                  <option value="0">Away</option>
                </select>
              </div>
              <div className={cx('filter-item')} onClick={handleFilterStadium}>
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
                            <img src={cityLogo} alt="man-city" />
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
