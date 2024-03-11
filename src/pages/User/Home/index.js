import classNames from 'classnames/bind';
import style from './Home.module.scss';
import FooterUser from '~/components/User/FooterUser';
import HeaderUser from '~/components/User/HeaderUser';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faPlay } from '@fortawesome/free-solid-svg-icons';
import logoEtihad from '../../../assets/images/etihad.webp';
import cityLogo from '~/assets/images/manchester_city.webp';
import { baseUrl } from '~/axios';
import { useEffect, useState } from 'react';
import { userService } from '~/services';

const cx = classNames.bind(style);

function Home() {
  const [rotation, setRotation] = useState(0);
  const [matchFuture, setMatchFuture] = useState();

  const handleGetMatchFuture = async () => {
    const res = await userService.getAllMatches();
    const currentDateTime = new Date();
    const upcomingMatches = res.matches
      .filter((match) => {
        const gameDateTime = new Date(`${match.game_date}T${match.game_time}`);
        return gameDateTime > currentDateTime;
      })
      .sort((a, b) => {
        const dateA = new Date(`${a.game_date}T${a.game_time}`);
        const dateB = new Date(`${b.game_date}T${b.game_time}`);
        return dateA - dateB;
      });

    if (upcomingMatches.length > 0) {
      setMatchFuture(upcomingMatches[0]);
    }
  };

  function extractHourFromTimeString(timeString) {
    var dateObject = new Date('1970-01-01T' + timeString + 'Z');
    var hour = dateObject.getUTCHours();
    var minute = dateObject.getUTCMinutes();
    var formattedTime = (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' : '') + minute;
    return formattedTime;
  }

  useEffect(() => {
    handleGetMatchFuture();
    const intervalId = setInterval(() => {
      setRotation((prevRotation) => (prevRotation - 2.5) % 360);
    }, 100);
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <HeaderUser />
      <div className={cx('treble-winners')}>
        <img src="https://www.mancity.com/dist/images/events/treble/treble.svg" alt="treble" />
        <img src="https://www.mancity.com/dist/images/events/treble/treble-trophies.svg" alt="cup" />
        <img src="https://www.mancity.com/dist/images/events/treble/winners.svg" alt="winners" />
      </div>
      <main className={cx('main-content')}>
        <header className={cx('header-content')}>
          <img src={logoEtihad} alt="Etihad" />
        </header>
        <div className={cx('section-content')}>
          <section className={cx('main-place')}>
            <div className={cx('container')}>
              <div className={cx('primary-info-item')}>
                <div className={cx('info-card')}>
                  <h2>One Club for All</h2>
                  <div className={cx('content')}>Learn about our Club and the Manchester City board</div>
                  <Link to="/">Find out more</Link>
                </div>
              </div>
              <Link to="/manchester-city-history" className={cx('primary-info-item', 'history')}>
                <div className={cx('info-card')}>
                  <img src="https://www.mancity.com/meta/media/rpaj4wiz/city-badge-monochrome.svg" alt="logo" />
                  <h2>
                    Our History
                    <FontAwesomeIcon icon={faArrowRight} />
                  </h2>
                  <div className={cx('content')}>Read all about our highs, lows and glorious history</div>
                </div>
              </Link>
              <Link
                to="https://www.google.com/maps/place/S%C3%A2n+v%E1%BA%ADn+%C4%91%E1%BB%99ng+Th%C3%A0nh+ph%E1%BB%91+Manchester/@53.4831634,-2.2003736,15z/data=!4m14!1m7!3m6!1s0x487bb10dcc950ae3:0x549a8dcce67a876a!2zU8OibiB24bqtbiDEkeG7mW5nIFRow6BuaCBwaOG7kSBNYW5jaGVzdGVy!8m2!3d53.4831634!4d-2.2003736!16zL20vMDJueWNi!3m5!1s0x487bb10dcc950ae3:0x549a8dcce67a876a!8m2!3d53.4831634!4d-2.2003736!16zL20vMDJueWNi?entry=ttu"
                target="_blank"
                className={cx('primary-info-item', 'history')}
              >
                <div className={cx('info-card')}>
                  <img src="https://www.mancity.com/meta/media/0j1lrzqy/icon-location.svg" alt="place" />
                  <h2>
                    Visiting the Etihad Stadium
                    <FontAwesomeIcon icon={faArrowRight} />
                  </h2>
                  <div className={cx('content')}>All you need to know about visiting the Etihad Stadium.</div>
                </div>
              </Link>
            </div>
          </section>
        </div>
        <div className={cx('container')}>
          <Link
            to="https://www.mancity.com/citytv/mens/celebrating-35-years-of-king-of-the-kippax-63841357"
            className={cx('super-banner')}
            target="_blank"
          >
            <div className={cx('main')}>
              <header>
                <p>Features</p>
                <h2>King of the Kippax: A 35-year celebration</h2>
              </header>
              <footer>
                <div>
                  <div className={cx('icon')}>
                    <FontAwesomeIcon icon={faPlay} />
                  </div>
                </div>
              </footer>
            </div>
            <div className={cx('aside')}>
              <div>
                <img
                  src="https://www.mancity.com/meta/media/ai4o3xvh/widekok.jpg?width=950&height=536&mode=crop"
                  alt=""
                />
              </div>
            </div>
          </Link>
        </div>
        <div className={cx('fixture')}>
          <h1>FEATURES</h1>
          <div className={cx('container')}>
            <div className={cx('match')}>
              <div className={cx('header')}>
                <h3>NEXT FIXTURE</h3>
                <Link to="/tickets">
                  All fixture <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              </div>
              <div className={cx('tournaments')}>
                <div className={cx('start-date')}>
                  <div className={cx('date')}>{matchFuture?.game_date}</div>
                  <p>Premier League</p>
                </div>
              </div>
              <div className={cx('team')}>
                <div className={cx('first')}>
                  <div className={cx('logo')}>
                    <img src={matchFuture?.host === 1 ? cityLogo : baseUrl + matchFuture?.club.image} alt="No images" />
                  </div>
                  <div className={cx('name')}>
                    {matchFuture?.host === 1 ? 'Manchester City' : matchFuture?.club.name}
                  </div>
                </div>
                <div className={cx('time')}>
                  <div className={cx('content')}>
                    <time>{extractHourFromTimeString(matchFuture?.game_time)}</time>
                    <p>GMT</p>
                  </div>
                </div>
                <div className={cx('second')}>
                  <div className={cx('logo')}>
                    <img src={matchFuture?.host === 1 ? baseUrl + matchFuture?.club.image : cityLogo} alt="No images" />
                  </div>
                  <div className={cx('name')}>
                    {matchFuture?.host === 1 ? matchFuture?.club.name : 'Manchester City'}
                  </div>
                </div>
              </div>
              <div className={cx('footer')}>
                <Link to={`matches/${matchFuture?.game_id}`} className={cx('btn-buy')}>
                  Buy tickets
                </Link>
              </div>
            </div>
            <div className={cx('border')}>
              <div
                className={cx('wrapper')}
                style={{
                  transformOrigin: '50% 50%',
                  transform: `translate3d(0px, 0px, -180px) rotateY(${rotation}deg)`,
                }}
              >
                <div
                  className={cx('panel', 'one')}
                  style={{ transformOrigin: '50% 50%', transform: 'translate(0px, 0px)' }}
                ></div>
                <div
                  className={cx('panel', 'two')}
                  style={{ transformOrigin: '50% 50%', transform: 'translate3d(120px, 0px, -120px) rotateY(90deg)' }}
                ></div>
                <div
                  className={cx('panel', 'three')}
                  style={{ transformOrigin: '50% 50%', transform: 'translate3d(0px, 0px, -240px) rotateY(180deg)' }}
                ></div>
                <div
                  className={cx('panel', 'four')}
                  style={{ transformOrigin: '50% 50%', transform: 'translate3d(-120px, 0px, -120px) rotateY(270deg)' }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <FooterUser />
    </div>
  );
}

export default Home;
