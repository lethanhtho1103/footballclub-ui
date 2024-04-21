import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './DetailMatch.module.scss';
import bg1 from '~/assets/images/bg.jpg';
import cityLogo from '~/assets/images/manchester_city.webp';
import { baseUrl } from '~/axios';

const cx = classNames.bind(styles);

function DetailMatchLive({ match, isLive }) {
  const [time, setTime] = useState(new Date()); // Sử dụng state để lưu trữ thời gian

  useEffect(() => {
    let interval;
    if (isLive) {
      // Nếu trận đấu đang diễn ra, cập nhật thời gian mỗi giây
      interval = setInterval(() => {
        setTime(new Date());
      }, 1000); // 1000ms = 1 giây
    }
    return () => clearInterval(interval);
  }, [isLive]);

  const startMatchTime = new Date(match?.game_date + 'T' + match?.game_time); // Tạo đối tượng Date từ thời gian bắt đầu trận đấu
  const elapsedMinutes = Math.floor((time - startMatchTime) / (1000 * 60)); // Tính số phút đã trôi qua

  function convertTimeFormat(timeString) {
    var timeParts = timeString?.split(':');
    if (!timeParts) return '';
    var hour = timeParts[0];
    var minute = timeParts[1];
    return `${hour}:${minute}`;
  }

  return (
    <>
      <div className={cx('container')}>
        <div className={cx('background')}>
          <img src={bg1} alt="bg1" />
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
                  <div className={cx('minute')}>{minute}'</div>
                </>
              ) : (
                <>
                  <div className={cx('score')}>
                    <div className={cx('away')}>{match?.goals_conceded}</div>
                    <span>-</span>
                    <div className={cx('host')}>{match?.goals_scored}</div>
                  </div>
                  <div className={cx('minute')}>{minute}'</div>
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
