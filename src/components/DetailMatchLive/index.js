import cityLogo from '~/assets/images/manchester_city.webp';
import { baseUrl } from '~/axios';
import bg1 from '~/assets/images/bg.jpg';
import classNames from 'classnames/bind';
import styles from './DetailMatch.module.scss';
import { useEffect, useState } from 'react';
const cx = classNames.bind(styles);

function DetailMatchLive({ match, isLive }) {
  const [minute, setMinute] = useState(1);

  const increaseMinute = () => {
    setMinute((prevMinute) => prevMinute + 1);
  };

  function convertTimeFormat(timeString) {
    var timeParts = timeString?.split(':');
    if (timeParts) {
      var hour = timeParts[0];
      var minute = timeParts[1];
    }
    var formattedTime = hour + ':' + minute;
    return formattedTime;
  }

  useEffect(() => {
    let interval;
    if (isLive) {
      interval = setInterval(increaseMinute, 60000); //
    }
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLive]);

  return (
    <>
      <div className={cx('container')}>
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
              <div className={cx('name')}>{match?.host === 1 ? 'Manchester City' : match?.club.name}</div>
              <div className={cx('logo')}>
                {match?.host === 1 ? (
                  <img src={cityLogo} alt="man-city" />
                ) : (
                  <img src={`${baseUrl}${match?.club.image}`} alt="Name" />
                )}
              </div>
            </div>
            {isLive ? (
              match?.host === 1 ? (
                <>
                  <div className={cx('score')}>
                    <div className={cx('host')}>{match?.goals_scored}</div>
                    <span>-</span>
                    <div className={cx('away')}>{match?.goals_conceded}</div>
                  </div>
                  {match?.state === 'in_progress' && <div className={cx('minute')}>{minute}'</div>}
                </>
              ) : (
                <>
                  <div className={cx('score')}>
                    <div className={cx('away')}>{match?.goals_conceded}</div>
                    <span>-</span>
                    <div className={cx('host')}>{match?.goals_scored}</div>
                  </div>
                  {match?.state === 'in_progress' && <div className={cx('minute')}>{minute}'</div>}
                </>
              )
            ) : (
              <div className={cx('time')}>
                <time>{convertTimeFormat(match?.game_time)}</time>
                <p>GMT</p>
              </div>
            )}
            <div className={cx('second')}>
              {match?.host !== 1 ? (
                <img src={cityLogo} alt="man-city" />
              ) : (
                <img src={`${baseUrl}${match?.club.image}`} alt="Name" />
              )}
              <div className={cx('name')}>{match?.host !== 1 ? 'Manchester City' : match?.club.name}</div>
            </div>
          </div>
          {match?.state === 'in_progress' ? (
            <div className={cx('live')}>Live now</div>
          ) : (
            <div className={cx('upcoming')}>Upcoming</div>
          )}
        </div>
      </div>
      {match?.state === 'in_progress' && (
        <div className={cx('detail-match')}>
          <div className={cx('haft-first')}>
            <div className={cx('title')}>
              <span>Haft first</span>
            </div>
            <div
              className={cx('detail', {
                reverse: match?.host === 0,
              })}
            >
              <div className={cx('host')}>
                <ul>
                  {match?.game_detail
                    .filter((detail) => detail.is_away === 0 && detail.time <= '45')
                    .map((detail) => (
                      <li key={detail.game_detail_id}>
                        {detail.time}'
                        {detail.type === 'yellow' && (
                          <div>
                            <span className={cx('yellow')}></span>
                          </div>
                        )}
                        {detail.type === 'red' && (
                          <div>
                            <span className={cx('red')}></span>
                          </div>
                        )}
                        <p>{detail.player_name}</p>
                      </li>
                    ))}
                </ul>
              </div>
              <div className={cx('away')}>
                <ul>
                  {match?.game_detail
                    .filter((detail) => detail.is_away === 1 && detail.time <= '45')
                    .map((detail) => (
                      <li key={detail.game_detail_id}>
                        {detail.time}'
                        {detail.type === 'yellow' && (
                          <div>
                            <span className={cx('yellow')}></span>
                          </div>
                        )}
                        {detail.type === 'red' && (
                          <div>
                            <span className={cx('red')}></span>
                          </div>
                        )}
                        <p>{detail.player_name}</p>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
          <div className={cx('haft-second')}>
            <div className={cx('title')}>
              <div>Haft second</div>
            </div>
            <div
              className={cx('detail', {
                reverse: match?.host === 0,
              })}
            >
              <div className={cx('host')}>
                <ul>
                  {match?.game_detail
                    .filter((detail) => detail.is_away === 0 && detail.time > '45')
                    .map((detail) => (
                      <li key={detail.game_detail_id}>
                        {detail.time}'
                        {detail.type === 'yellow' && (
                          <div>
                            <span className={cx('yellow')}></span>
                          </div>
                        )}
                        {detail.type === 'red' && (
                          <div>
                            <span className={cx('red')}></span>
                          </div>
                        )}
                        <p>{detail.player_name}</p>
                      </li>
                    ))}
                </ul>
              </div>
              <div className={cx('away')}>
                <ul>
                  {match?.game_detail
                    .filter((detail) => detail.is_away === 1 && detail.time > '45')
                    .map((detail) => (
                      <li key={detail.game_detail_id}>
                        {detail.time}'
                        {detail.type === 'yellow' && (
                          <div>
                            <span className={cx('yellow')}></span>
                          </div>
                        )}
                        {detail.type === 'red' && (
                          <div>
                            <span className={cx('red')}></span>
                          </div>
                        )}
                        <p>{detail.player_name}</p>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DetailMatchLive;
