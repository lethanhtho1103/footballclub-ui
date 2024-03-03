import classNames from 'classnames/bind';
import style from './Results.module.scss';
import FooterUser from '~/components/User/FooterUser';
import HeaderUser from '~/components/User/HeaderUser';
import premier from '~/assets/images/premier.webp';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import cityLogo from '~/assets/images/manchester_city.webp';
import { baseUrl } from '~/axios';
import { useEffect, useState } from 'react';
import { userService } from '~/services';
const cx = classNames.bind(style);

function Results() {
  const [results, setResults] = useState([]);

  const handleGetAllMatchesHistory = async () => {
    const res = await userService.getAllMatchesHistory();
    setResults(
      res.history_matches.sort((a, b) => {
        const dateA = new Date(`${a.game_date}T${a.game_time}`);
        const dateB = new Date(`${b.game_date}T${b.game_time}`);
        return dateB - dateA;
      }),
    );
  };
  useEffect(() => {
    handleGetAllMatchesHistory();
  }, []);
  return (
    <div>
      <HeaderUser />
      <div className={cx('treble-winners')}>
        <img src="https://www.mancity.com/dist/images/events/treble/treble.svg" alt="treble" />
        <img src="https://www.mancity.com/dist/images/events/treble/treble-trophies.svg" alt="cup" />
        <img src="https://www.mancity.com/dist/images/events/treble/winners.svg" alt="winners" />
      </div>
      <div className={cx('title')}>
        <h2>Results</h2>
      </div>
      <main className={cx('main-content')}>
        <div className={cx('body')}>
          <div className={cx('container')}>
            <ul className={cx('list-match')}>
              {results.map((result, index) => (
                <li className={cx('match-item')}>
                  <div className={cx('wrapper')}>
                    <div className={cx('heading')}>
                      <div className={cx('logo-premier')}>
                        <img src={premier} alt="Premier" />
                      </div>
                      <div className={cx('info')}>
                        <time>{result.game_date}</time>
                        <div>Premier League</div>
                        <div>{result.stadium.name}</div>
                      </div>
                      <div
                        className={cx('results', {
                          win: result.result === 'win',
                          lose: result.result === 'loss',
                          draw: result.result === 'draw',
                        })}
                      >
                        <span>{result.result.slice(0, 1)}</span>
                      </div>
                    </div>
                    <div className={cx('content')}>
                      <div className={cx('wrapper')}>
                        <div className={cx('first')}>
                          <div className={cx('name')}>{result.host === 1 ? 'Manchester City' : result.club.name}</div>
                          <img src={result.host === 1 ? cityLogo : baseUrl + result.club.image} alt="No images" />
                        </div>
                        {result.host === 1 ? (
                          <div className={cx('score')}>
                            <div className={cx('host')}>{result.goals_scored}</div>
                            <span>-</span>
                            <div className={cx('away')}>{result.goals_conceded}</div>
                          </div>
                        ) : (
                          <div className={cx('score')}>
                            <div className={cx('away')}>{result.goals_conceded}</div>
                            <span>-</span>
                            <div className={cx('host')}>{result.goals_scored}</div>
                          </div>
                        )}

                        <div className={cx('second')}>
                          <div className={cx('logo')}>
                            <img src={result.host === 1 ? baseUrl + result.club.image : cityLogo} alt="No images" />
                          </div>
                          <div className={cx('name')}>{result.host === 1 ? result.club.name : 'Manchester City'}</div>
                        </div>
                      </div>
                    </div>
                    <div className={cx('hight-light')}>
                      <Link to="/" className={cx('text')}>
                        Hightlights
                      </Link>
                      <FontAwesomeIcon icon={faArrowRight} />
                    </div>
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

export default Results;
